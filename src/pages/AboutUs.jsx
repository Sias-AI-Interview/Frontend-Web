import ScrollToTopButton from "@/components/animated/ScrollToTopButton";
import RadialBG from "../components/animated/Radial";
import Navbar from "../components/navigation/Navbar";
import AboutUsComponent from "../components/pages/AboutComponent";
import FooterSectionLanding from "../footer/Footer";
import SEO from "@/components/SEO/SEO";

export default function AboutPages() {
    return (
        <>
            <SEO
                title="About Us | Smart Interview Assessment System"
                description="Learn more about the mission behind SIAS and how AI transforms recruitment."
                ogImage="/images/about/ai-interview-technology-futuristic-blue.png"
            />
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