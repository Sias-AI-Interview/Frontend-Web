"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

import { FaBrain } from "react-icons/fa6";
import { FaBullseye } from "react-icons/fa";
import { PiClockFill } from "react-icons/pi";
import { FaChartBar, FaShieldAlt, FaBolt } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        icon: FaBrain,
        key: "aiAnalysis"
    },
    {
        icon: FaBullseye,
        key: "objective"
    },
    {
        icon: PiClockFill,
        key: "timeEfficient"
    },
    {
        icon: FaChartBar,
        key: "reports"
    },
    {
        icon: FaShieldAlt,
        key: "security"
    },
    {
        icon: FaBolt,
        key: "realtime"
    }
];

export default function FeaturesSection() {
    const { t } = useTranslation();
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                titleRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 85%",
                    }
                }
            );

            cardsRef.current.forEach((card, index) => {
                gsap.fromTo(
                    card,
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        delay: index * 0.12,
                        scrollTrigger: {
                            trigger: card,
                            start: "top 90%"
                        }
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-6 relative">
            <div className="max-w-6xl mx-auto">

                <div ref={titleRef} className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#6EACDA]/10 border border-[#6EACDA]/20 text-[#6EACDA] text-sm font-medium mb-4">
                        {t("features.badge")}
                    </span>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {t("features.title")}{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6EACDA] via-cyan-400 to-[#6EACDA]/60">
                            SIAS
                        </span>
                        ?
                    </h2>

                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        {t("features.subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        const key = feature.key;

                        return (
                            <div
                                key={index}
                                ref={(el) => (cardsRef.current[index] = el)}
                                className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#6EACDA]/30 transition-all duration-500 hover:bg-white/[0.04]"
                            >
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#6EACDA]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-[#6EACDA]/10 flex items-center justify-center mb-4 group-hover:bg-[#6EACDA]/20 transition-colors duration-300">
                                        <Icon className="w-6 h-6 text-[#6EACDA]" />
                                    </div>

                                    <h3 className="text-xl font-semibold text-white mb-2">
                                        {t(`features.items.${key}.title`)}
                                    </h3>

                                    <p className="text-slate-400 leading-relaxed">
                                        {t(`features.items.${key}.description`)}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
