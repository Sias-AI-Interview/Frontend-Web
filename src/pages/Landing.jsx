
import HeroSection from "../components/section/HeroSection";
import FeaturesSection from "../components/section/FeaturesSection";
import HowToUseSection from "../components/section/HowToUseSection";
import StatsSection from "../components/section/StatsSection";
import TestimonialsSection from "../components/section/TestimonialsSection";
import PricingSection from "../components/section/PricingSection";
import CTASection from "../components/section/CTASection";
import React from "react";

export default function Home() {
    return (
        <React.Fragment>
            <HeroSection />
            <StatsSection />
            <FeaturesSection />
            <HowToUseSection />
            <TestimonialsSection />
            <PricingSection />
            <CTASection />
        </React.Fragment>
    );
}
