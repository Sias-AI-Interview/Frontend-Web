"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FaArrowRight } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { useTranslation } from "react-i18next"

gsap.registerPlugin(ScrollTrigger)

export default function CTASection() {
    const { t } = useTranslation()
    const sectionRef = useRef(null)
    const contentRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                contentRef.current,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    },
                },
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 px-6 relative">
            <div className="max-w-4xl mx-auto">
                <div
                    ref={contentRef}
                    className="relative p-12 md:p-16 rounded-3xl bg-gradient-to-br from-[#6EACDA]/20 via-[#6EACDA]/10 to-transparent border border-[#6EACDA]/30 text-center overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-64 h-64 bg-[#6EACDA]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6EACDA]/10 border border-[#6EACDA]/20 text-[#6EACDA] text-sm font-medium mb-6">
                            <HiSparkles className="w-4 h-4" />
                            {t("cta.badge")}
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 text-balance">
                            {t("cta.title")}
                        </h2>

                        <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                            {t("cta.desc")}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[#6EACDA] text-[#021526] font-semibold transition-all duration-300 hover:bg-[#6EACDA]/90 hover:shadow-lg hover:shadow-[#6EACDA]/30 hover:gap-4">
                                {t("cta.btnStart")}
                                <FaArrowRight className="w-5 h-5" />
                            </button>

                            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-white/10 text-white font-semibold transition-all duration-300 hover:bg-white/20">
                                {t("cta.btnDemo")}
                            </button>
                        </div>

                        <p className="text-slate-400 text-sm mt-6">
                            {t("cta.footnote")}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
