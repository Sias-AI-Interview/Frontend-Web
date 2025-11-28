import Navbar from "../components/navigation/Navbar.jsx";
import Home from "./Landing.jsx";
import RadialBG from "../components/animated/Radial.jsx";
import FooterSectionLanding from "../footer/Footer.jsx";
import ScrollToTopButton from "@/components/animated/ScrollToTopButton.jsx";

export default function LandingPages() {
    return (
        <>
            <div className="relative min-h-screen w-full">
                <RadialBG>
                    <Navbar />
                    <div className="p-8">
                        <Home />
                    </div>
                    <ScrollToTopButton />
                    <FooterSectionLanding />
                </RadialBG>
            </div>
        </>
    );
}