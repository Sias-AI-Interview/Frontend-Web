import Navbar from "./components/navigation/Navbar.jsx";
import Home from "./pages/Landing.jsx";
import RadialBG from "./components/animated/Radial.jsx";
import FooterSectionLanding from "./footer/Footer.jsx";

export default function App() {
  return (
    <div className="relative min-h-screen w-full">
      <RadialBG>
        <Navbar />
        <div className="p-8">
          <Home />
        </div>
        <FooterSectionLanding />
      </RadialBG>
    </div>
  );
}
