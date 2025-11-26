"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCheck } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { useTranslation, Trans } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

export default function PricingSection() {
    const { t } = useTranslation();

    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef([]);

    const plans = [
        { key: "starter", price: "Free", period: "", highlighted: false },
        { key: "pro", price: "Rp 499K", period: "/month", highlighted: true },
        { key: "enterprise", price: "Custom", period: "", highlighted: false }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                titleRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: { trigger: titleRef.current, start: "top 85%" }
                }
            );

            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                gsap.fromTo(
                    card,
                    { y: 80, opacity: 0, scale: 0.95 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        delay: index * 0.1,
                        scrollTrigger: { trigger: card, start: "top 90%" }
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
                        {t("pricing.badge")}
                    </span>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        <Trans
                            i18nKey="pricing.title"
                            components={{
                                gradient: (
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6EACDA] via-cyan-400 to-[#6EACDA]/60"></span>
                                )
                            }}
                        />
                    </h2>

                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        {t("pricing.subtitle")}
                    </p>
                </div>

                {/* CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    {plans.map((plan, index) => {
                        const base = `pricing.plans.${plan.key}`;

                        return (
                            <div
                                key={plan.key}
                                ref={(el) => (cardsRef.current[index] = el)}
                                className={`relative p-8 rounded-2xl transition-all duration-500 ${plan.highlighted
                                    ? "bg-gradient-to-br from-[#6EACDA]/20 via-[#6EACDA]/10 to-transparent border-2 border-[#6EACDA]/50 scale-105"
                                    : "bg-white/[0.02] border border-white/10 hover:border-[#6EACDA]/30"
                                    }`}
                            >
                                {plan.highlighted && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#6EACDA] text-[#021526] text-sm font-semibold flex items-center gap-1">
                                        <HiSparkles className="w-4 h-4" />
                                        {t(`${base}.popular`)}
                                    </div>
                                )}

                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold text-white mb-2">
                                        {t(`${base}.name`)}
                                    </h3>
                                    <p className="text-slate-400 text-sm">
                                        {t(`${base}.description`)}
                                    </p>
                                </div>

                                <div className="mb-6">
                                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                                    <span className="text-slate-400">{plan.period}</span>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {t(`${base}.features`, { returnObjects: true }).map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-slate-300">
                                            <FaCheck className="w-5 h-5 text-[#6EACDA] flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${plan.highlighted
                                        ? "bg-[#6EACDA] text-[#021526] hover:bg-[#6EACDA]/90 hover:shadow-lg hover:shadow-[#6EACDA]/30"
                                        : "bg-white/10 text-white hover:bg-white/20"
                                        }`}
                                >
                                    {t(`${base}.button`)}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
