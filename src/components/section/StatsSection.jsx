"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaChartLine, FaBuilding, FaClock, FaCheckCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

export default function StatsSection() {
    const { t } = useTranslation();

    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const statsRef = useRef([]);

    const AnimatedNumber = ({ value, suffix }) => {
        const [count, setCount] = useState(0);
        const ref = useRef(null);

        useEffect(() => {
            const element = ref.current;
            if (!element) return;

            const trigger = ScrollTrigger.create({
                trigger: element,
                start: "top 85%",
                onEnter: () => {
                    const duration = 2000;
                    const startTime = Date.now();

                    const animate = () => {
                        const elapsed = Date.now() - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const ease = 1 - Math.pow(1 - progress, 3); // smooth animation
                        setCount(Math.floor(ease * value));

                        if (progress < 1) requestAnimationFrame(animate);
                    };

                    animate();
                },
                once: true,
            });

            return () => trigger.kill();
        }, [value]);

        return (
            <span ref={ref}>
                {count.toLocaleString()}
                {suffix}
            </span>
        );
    };

    const stats = [
        {
            key: "stat1",
            value: 10000,
            suffix: "+",
            icon: <FaChartLine className="w-6 h-6 text-[#6EACDA]" />,
        },
        {
            key: "stat2",
            value: 95,
            suffix: "%",
            icon: <FaCheckCircle className="w-6 h-6 text-[#6EACDA]" />,
        },
        {
            key: "stat3",
            value: 80,
            suffix: "%",
            icon: <FaClock className="w-6 h-6 text-[#6EACDA]" />,
        },
        {
            key: "stat4",
            value: 500,
            suffix: "+",
            icon: <FaBuilding className="w-6 h-6 text-[#6EACDA]" />,
        },
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
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 85%",
                    },
                }
            );

            statsRef.current.forEach((item, index) => {
                if (!item) return;

                gsap.fromTo(
                    item,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.9,
                        delay: index * 0.15,
                        scrollTrigger: {
                            trigger: item,
                            start: "top 90%",
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-6 relative">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div ref={titleRef} className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#6EACDA]/10 border border-[#6EACDA]/20 text-[#6EACDA] text-sm font-medium mb-4">
                        {t("stats.badge")}
                    </span>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {t("stats.title")}
                    </h2>

                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        {t("stats.subtitle")}
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={stat.key}
                            ref={(el) => (statsRef.current[index] = el)}
                            className="group p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#6EACDA]/20 hover:bg-white/[0.05] transition-all duration-300 text-center"
                        >
                            <div className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center bg-[#6EACDA]/15 border border-[#6EACDA]/20">
                                {stat.icon}
                            </div>

                            <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6EACDA] to-cyan-400 mb-2">
                                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                            </div>

                            <p className="text-slate-400 text-sm md:text-base">
                                {t(`stats.items.${stat.key}`)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
