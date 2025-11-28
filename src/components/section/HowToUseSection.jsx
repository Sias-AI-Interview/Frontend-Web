"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaPlay, FaRegCheckCircle } from "react-icons/fa"

import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

export default function HowToUseSection() {
    const { t } = useTranslation();

    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const videoRef = useRef(null);
    const stepsRef = useRef([]);
    const [isPlaying, setIsPlaying] = useState(false);

    const steps = [
        {
            key: "step01",
        },
        {
            key: "step02",
        },
        {
            key: "step03",
        },
        {
            key: "step04",
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
                        toggleActions: "play none none reverse",
                    },
                }
            );

            gsap.fromTo(
                videoRef.current,
                { y: 60, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: videoRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            stepsRef.current.forEach((step, index) => {
                if (step) {
                    gsap.fromTo(
                        step,
                        { x: -40, opacity: 0 },
                        {
                            x: 0,
                            opacity: 1,
                            duration: 0.8,
                            delay: index * 0.15,
                            scrollTrigger: {
                                trigger: step,
                                start: "top 90%",
                                toggleActions: "play none none reverse",
                            },
                        }
                    );
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handlePlayVideo = () => setIsPlaying(true);

    return (
        <section ref={sectionRef} className="py-24 px-6 relative" id="how-to-use">
            <div className="max-w-6xl mx-auto">
                <div ref={titleRef} className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#6EACDA]/10 border border-[#6EACDA]/20 text-[#6EACDA] text-sm font-medium mb-4">
                        {t("howToUse.badge")}
                    </span>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {t("howToUse.title")}{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6EACDA] via-cyan-400 to-[#6EACDA]/60">
                            {t("howToUse.highlight")}
                        </span>
                    </h2>

                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        {t("howToUse.subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div
                        ref={videoRef}
                        className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] group"
                    >
                        <div className="aspect-video relative">
                            {!isPlaying ? (
                                <>
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#021526] via-[#021526]/90 to-[#6EACDA]/20">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center">
                                                <div
                                                    className="w-20 h-20 mx-auto rounded-full bg-[#6EACDA]/20 border border-[#6EACDA]/30 flex items-center justify-center mb-4 group-hover:bg-[#6EACDA]/30 transition-all duration-300 cursor-pointer hover:scale-110"
                                                    onClick={handlePlayVideo}
                                                >
                                                    <FaPlay className="w-8 h-8 text-[#6EACDA] ml-1" />
                                                </div>

                                                <p className="text-white font-medium">
                                                    {t("howToUse.video.watchDemo")}
                                                </p>
                                                <p className="text-slate-400 text-sm">
                                                    {t("howToUse.video.duration")}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Window dots */}
                                    <div className="absolute top-4 left-4 flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                    </div>
                                </>
                            ) : (
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                                    title="SIAS Demo Video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        {steps.map((step, index) => {
                            const base = `howToUse.steps.${step.key}`;

                            return (
                                <div
                                    key={index}
                                    ref={(el) => (stepsRef.current[index] = el)}
                                    className="group flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#6EACDA]/20 transition-all duration-300 hover:bg-white/[0.04]"
                                >
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6EACDA]/20 to-[#6EACDA]/5 flex items-center justify-center border border-[#6EACDA]/20">
                                            <span className="text-[#6EACDA] font-bold text-sm">
                                                {t(`${base}.number`)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
                                            {t(`${base}.title`)}
                                            <FaRegCheckCircle className="w-4 h-4 text-[#6EACDA]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </h3>

                                        <p className="text-slate-400 text-sm leading-relaxed">
                                            {t(`${base}.description`)}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
}
