import ScrollToTopButton from "@/components/animated/ScrollToTopButton";
import RadialBG from "../components/animated/Radial";
import Navbar from "../components/navigation/Navbar";
import AboutUsComponent from "../components/pages/AboutComponent";
import FooterSectionLanding from "../footer/Footer";

export default function AboutPages() {
    return (
        <>
            <div className="relative min-h-screen w-full">
                <RadialBG>
                    <Navbar />
                    <div>
                        <AboutUsComponent />
                    </div>
                    <ScrollToTopButton />

                    <FooterSectionLanding />
                </RadialBG>
            </div>
        </>
    )
}