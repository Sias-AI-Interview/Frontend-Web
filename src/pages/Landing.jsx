
import HeroSection from "../components/section/HeroSection";
import React from "react";
import WorldMapCode from "../components/section/WorldProvider";

export default function Home() {
    return (
        <React.Fragment>
            <HeroSection />
            <WorldMapCode />
        </React.Fragment>
    );
}
