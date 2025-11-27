import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useTranslation } from "react-i18next"

import {
    FaUsers,
    FaLightbulb,
    FaHeart,
    FaLinkedin,
    FaGithub,
    FaEnvelope,
    FaBolt,
    FaGlobe,
    FaAward
} from "react-icons/fa"
import { FaConnectdevelop } from "react-icons/fa6";
import { GiSparkles, GiTargetDummy } from "react-icons/gi"
import { PiSparkleFill } from "react-icons/pi"


gsap.registerPlugin(ScrollTrigger)

export default function AboutUsComponent() {
    const { t } = useTranslation()

    const heroRef = useRef(null)
    const storyRef = useRef(null)
    const valuesRef = useRef(null)
    const teamRef = useRef(null)
    const orbsContainerRef = useRef(null)

    const teamMembers = t("aboutPage.team", { returnObjects: true })
    const values = t("aboutPage.values", { returnObjects: true })
    const floatingOrbs = t("aboutPage.floatingOrbs", { returnObjects: true })
    const tagsMission = t("aboutPage.mission.tags", { returnObjects: true })

    useEffect(() => {
        const orbElements = orbsContainerRef.current?.querySelectorAll(".parallax-orb")

        orbElements?.forEach((orb, index) => {
            const speed = floatingOrbs[index]?.speed || 0.5

            gsap.to(orb, {
                y: () => window.innerHeight * speed * 0.5,
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
                }
            })

            gsap.to(orb, {
                y: `+=${15 + index * 3}`,
                x: index % 2 === 0 ? "+=8" : "-=8",
                duration: 4 + index * 0.3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            })
        })

        gsap.fromTo(
            heroRef.current?.querySelectorAll(".animate-hero"),
            { opacity: 0, y: 60 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
        )

        gsap.fromTo(
            storyRef.current?.querySelectorAll(".animate-story"),
            { opacity: 0, x: -60 },
            {
                opacity: 1,
                x: 0,
                duration: 0.9,
                stagger: 0.25,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: storyRef.current,
                    start: "top 80%"
                }
            }
        )

        gsap.fromTo(
            valuesRef.current?.querySelectorAll(".value-card"),
            { opacity: 0, y: 60, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                stagger: 0.12,
                ease: "back.out(1.2)",
                scrollTrigger: {
                    trigger: valuesRef.current,
                    start: "top 80%"
                }
            }
        )

        gsap.fromTo(
            teamRef.current?.querySelectorAll(".team-card"),
            { opacity: 0, scale: 0.85, rotateY: 15 },
            {
                opacity: 1,
                scale: 1,
                rotateY: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "back.out(1.4)",
                scrollTrigger: {
                    trigger: teamRef.current,
                    start: "top 80%"
                }
            }
        )

        return () => ScrollTrigger.getAll().forEach((t) => t.kill())
    }, [floatingOrbs])

    return (
        <>
            {/* HERO */}
            <section ref={heroRef} className="relative w-full min-h-screen overflow-hidden">
                <div ref={orbsContainerRef} className="pointer-events-none absolute inset-0">
                    {floatingOrbs.map((orb, i) => (
                        <div
                            key={i}
                            className="parallax-orb absolute rounded-full"
                            style={{
                                width: orb.size,
                                height: orb.size,
                                top: orb.top,
                                left: orb.left,
                                backgroundColor: orb.color,
                                boxShadow: `0 0 40px ${orb.glow}`,
                                opacity: 0.35,
                            }}
                        />

                    ))}
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center min-h-screen py-40 px-6">
                    <span className="animate-hero flex flex-row gap-3 items-center px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-[#6EACDA] text-base font-medium mb-8">
                        <FaUsers className="w-5 h-5" />
                        {t("aboutPage.hero.about")}
                    </span>

                    <h1 className="animate-hero text-center text-6xl leading-tight font-bold">
                        <span className="bg-gradient-to-r from-white to-[#6EACDA] bg-clip-text text-transparent">
                            {t("aboutPage.hero.title1")}
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-[#6EACDA] to-[#2F66FF] bg-clip-text text-transparent">
                            {t("aboutPage.hero.title2")}
                        </span>
                    </h1>

                    <p className="animate-hero mt-8 text-lg text-slate-300 max-w-3xl text-center">
                        {t("aboutPage.hero.subtitle")}
                    </p>

                    <div className="animate-hero mt-12 flex items-center gap-8 flex-wrap justify-center text-slate-400">
                        <div className="flex items-center gap-2"><FaBolt /> {t("aboutPage.hero.badges.aiPowered")}</div>
                        <div className="hidden sm:block w-1 h-1 bg-slate-500 rounded-full" />
                        <div className="flex items-center gap-2"><FaGlobe /> {t("aboutPage.hero.badges.globalReady")}</div>
                        <div className="hidden sm:block w-1 h-1 bg-slate-500 rounded-full" />
                        <div className="flex items-center gap-2"><FaAward /> {t("aboutPage.hero.badges.awardWinning")}</div>
                    </div>
                </div>
            </section>

            {/* STORY */}
            <section ref={storyRef} className="py-24 px-6 relative">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div className="animate-story relative group">
                        <img src="/images/about/ai-interview-technology-futuristic-blue.png" className="rounded-2xl" />
                    </div>

                    <div className="space-y-8">
                        <div className="animate-story">
                            <span className="text-[#6EACDA] text-sm font-medium tracking-wider uppercase mb-3 block">
                                {t("aboutPage.story.label")}
                            </span>
                            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                                {t("aboutPage.story.title")}
                            </h2>
                        </div>
                        <div className="animate-story space-y-5 text-slate-300 leading-relaxed text-lg">
                            <p>
                                {t("aboutPage.story.p1")}
                            </p>
                            <p>
                                {t("aboutPage.story.p2")}
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="relative rounded-3xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#6EACDA]/15 via-[#2F66FF]/10 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#021526] via-transparent to-[#6EACDA]/5" />
                        <div className="absolute inset-0 border border-[#6EACDA]/20 rounded-3xl" />

                        <div className="absolute top-0 right-0 w-80 h-80 bg-[#6EACDA]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#2F66FF]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                        <div className="relative z-10 p-10 md:p-20">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6EACDA] to-[#2F66FF] flex items-center justify-center">
                                    <GiSparkles className="w-7 h-7 text-white" />
                                </div>
                                <h2 className="text-3xl md:text-5xl font-bold text-white">{t("aboutPage.mission.title")}</h2>
                            </div>
                            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-4xl">
                                {t("aboutPage.mission.text")}
                            </p>
                            <div className="mt-10 flex flex-wrap gap-4">
                                {
                                    tagsMission.map((badge, i) => (
                                        <span key={i} className="px-5 py-2.5 rounded-full bg-[#6EACDA]/10 border border-[#6EACDA]/30 text-[#6EACDA] font-medium">
                                            {badge}
                                        </span>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* VALUES */}
            <section ref={valuesRef} className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="text-[#6EACDA] text-sm font-medium tracking-wider uppercase mb-4 block">
                            {t("aboutPage.valuesSection.label")}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{t("aboutPage.valuesSection.title")}</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                            {t("aboutPage.valuesSection.subtitle")}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="value-card group relative p-8 rounded-2xl bg-gradient-to-b from-white/[0.08] to-transparent border border-white/10 hover:border-[#6EACDA]/50 transition-all duration-500 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-[#6EACDA]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6EACDA]/20 to-[#2F66FF]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        {value.icon === "target" && <GiTargetDummy className="w-8 h-8 text-[#6EACDA]" />}
                                        {value.icon === "innovation" && <FaLightbulb className="w-8 h-8 text-[#6EACDA]" />}
                                        {value.icon === "heart" && <FaHeart className="w-8 h-8 text-[#6EACDA]" />}
                                        {value.icon === "integrity" && <FaConnectdevelop className="w-8 h-8 text-[#6EACDA]" />}
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                                    <p className="text-slate-400 leading-relaxed">{value.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TEAM */}
            <section ref={teamRef} className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="text-[#6EACDA] text-sm font-medium tracking-wider uppercase mb-4 block"> {t("aboutPage.teamSection.label")}</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 flex flex-row gap-3 text-center items-center justify-center"> <PiSparkleFill className="text-[#6EACDA] w-10 h-10" />  {t("aboutPage.teamSection.title")}</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                            {t("aboutPage.teamSection.subtitle")}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="team-card group relative">
                                <div className="absolute -inset-2 bg-gradient-to-r from-[#6EACDA]/20 to-[#2F66FF]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative rounded-2xl bg-gradient-to-b from-white/[0.08] to-transparent border border-white/10 overflow-hidden group-hover:border-[#6EACDA]/40 transition-all duration-500">
                                    <div className="aspect-[4/5] overflow-hidden">
                                        <img
                                            src={member.image || "/placeholder.svg"}
                                            alt={member.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#021526] via-transparent to-transparent" />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                                        <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                                        <p className="text-[#6EACDA] font-medium mb-4">{member.role}</p>
                                        <div className="flex justify-center gap-3">
                                            <a
                                                href={member.linkedin}
                                                className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#6EACDA]/30 transition-all duration-300"
                                            >
                                                <FaLinkedin className="w-5 h-5" />
                                            </a>
                                            <a
                                                href={member.github}
                                                className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#6EACDA]/30 transition-all duration-300"
                                            >
                                                <FaGithub className="w-5 h-5" />
                                            </a>
                                            <a
                                                href={member.email}
                                                className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#6EACDA]/30 transition-all duration-300"
                                            >
                                                <FaEnvelope className="w-5 h-5" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
