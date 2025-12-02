import Navbar from "../components/navigation/Navbar.jsx";
import Home from "./Landing.jsx";
import RadialBG from "../components/animated/Radial.jsx";
import FooterSectionLanding from "../footer/Footer.jsx";
import ScrollToTopButton from "@/components/animated/ScrollToTopButton.jsx";
import SEO from "@/components/SEO/SEO.jsx";

const APP = {
    thisApp: "SIAS",
    title: "Smart Interview Assessment System",
    subtitle:
        "**AI-Driven Interview** Scoring System to Accelerate Candidate Selection with **Objective** and **Efficient Evaluation**.",
    getStarted: "Get Started",
    scrollDown: "Scroll Down",
};

export default function LandingPages() {
    return (
        <>

            <SEO
                title={`${APP.thisApp} | Smart Interview Assessment System`}
                description="AI-powered interview scoring platform for objective candidate evaluation."
                keywords="AI interview, scoring automation, HR tech, recruitment system"
                ogImage="/images/logo/sias.svg"
            />
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