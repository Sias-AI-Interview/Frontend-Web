"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaStar } from "react-icons/fa";
import { RiDoubleQuotesL } from "react-icons/ri";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsSection() {
    const { t } = useTranslation();

    const testimonialsData = t("testimonials.items", { returnObjects: true });

    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef([]);

    const testimonials = [
        {
            key: "sarah",
            image: "./images/testimoni/professional-asian-woman.png",
            rating: 5,
        },
        {
            key: "ahmad",
            image: "./images/testimoni/professional-man-indonesian.jpg",
            rating: 5,
        },
        {
            key: "lisa",
            image: "./images/testimoni/professional-woman-executive.png",
            rating: 5,
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
                    scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
                }
            );

            cardsRef.current.forEach((card, index) => {
                if (card) {
                    gsap.fromTo(
                        card,
                        { y: 60, opacity: 0, rotateY: 10 },
                        {
                            y: 0,
                            opacity: 1,
                            rotateY: 0,
                            duration: 0.8,
                            delay: index * 0.15,
                            scrollTrigger: { trigger: card, start: "top 90%" },
                        }
                    );
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-6 relative">
            <div className="max-w-6xl mx-auto">

                {/* TITLE */}
                <div ref={titleRef} className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#6EACDA]/10 border border-[#6EACDA]/20 text-[#6EACDA] text-sm font-medium mb-4">
                        {t("testimonials.badge")}
                    </span>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {t("testimonials.title.normal")}{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6EACDA] via-cyan-400 to-[#6EACDA]/60">
                            {t("testimonials.title.highlight")}
                        </span>
                    </h2>

                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        {t("testimonials.subtitle")}
                    </p>
                </div>

                {/* CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((item, index) => {
                        const data = testimonialsData[index];
                        return (
                            <div
                                key={item.key}
                                ref={(el) => (cardsRef.current[index] = el)}
                                className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#6EACDA]/30 transition-all duration-500"
                            >
                                <RiDoubleQuotesL className="absolute top-4 right-4 w-8 h-8 text-[#6EACDA]/20" />

                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src={item.image}
                                        alt={data.name}
                                        className="w-14 h-14 rounded-full object-cover border-2 border-[#6EACDA]/30"
                                    />
                                    <div>
                                        <h4 className="text-white font-semibold">
                                            {data.name}
                                        </h4>
                                        <p className="text-slate-400 text-sm">
                                            {data.role}
                                        </p>
                                        <p className="text-[#6EACDA] text-xs">
                                            {data.company}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-1 mb-3">
                                    {Array.from({ length: item.rating }).map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className="w-4 h-4 fill-[#6EACDA] text-[#6EACDA]"
                                        />
                                    ))}
                                </div>

                                <p className="text-slate-300 leading-relaxed">
                                    {data.content}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
