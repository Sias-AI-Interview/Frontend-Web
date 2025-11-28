import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const isProduction = env.VITE_APP_PROD === "TRUE";
  const apiEndpoint = isProduction
    ? env.VITE_API_ENDPOINT_URL_PROD
    : env.VITE_API_ENDPOINT_URL;

  return {
    plugins: [react(), tailwindcss()],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },

    server: {
      proxy: {
        "/api": {
          target: apiEndpoint,
          changeOrigin: true,
          secure: true,
          rewrite: (p) => p.replace(/^\/api/, ""),
        },
      },
      historyApiFallback: true,
    },

    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: isProduction,
          drop_debugger: isProduction,
        },
      },
    },
  };
});
