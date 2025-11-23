import Navbar from "./components/navigation/Navbar.jsx";
import Home from "./pages/Landing.jsx";
import AnimatedBG from "./components/animated/Radial.jsx";

export default function App() {
  return (
    <div className="relative min-h-screen w-full">
      <AnimatedBG />
      <Navbar />
      <div className="p-8">
        <Home />
      </div>
    </div>
  );
}
