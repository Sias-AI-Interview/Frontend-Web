import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: import.meta.env.VITE_API_ENDPOINT_URL + "/api",
    baseURL: "/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {
    const raw = localStorage.getItem("sb-ewwozsikohikpbawgjuv-auth-token");

    let accessToken = null;
    let userId = null;

    if (raw) {
        try {
            const parsed = JSON.parse(raw);
            accessToken = parsed?.access_token ?? null;
            userId = parsed?.user?.id ?? null;
        } catch (err) {
            console.warn("Gagal parse Supabase token:", err);
        }
    }

    console.log("TOKEN DIKIRIM:", accessToken);
    console.log("USER ID DIKIRIM:", userId);

    const isPublic =
        config.url?.includes("/auth/register") ||
        config.url?.includes("/auth/login");

    if (accessToken && !isPublic) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (userId) {
        config.headers["X-USER-ID"] = userId;
    }

    return config;
});

export default axiosInstance;
