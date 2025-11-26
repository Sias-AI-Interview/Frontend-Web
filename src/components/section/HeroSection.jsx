import { useTranslation } from "react-i18next";
import RichText from "../../utils/RichText";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { BsMouse } from "react-icons/bs";

export default function     HeroSection() {
    const { t } = useTranslation();

    const appWrapperRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(
            appWrapperRef.current,
            { y: -30, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1 }
        )
            .fromTo(
                titleRef.current,
                { y: -30, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 1 },
                "-=0.7"
            )
            .fromTo(
                subtitleRef.current,
                { y: 20, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 1 },
                "-=0.5"
            )
            .fromTo(
                buttonRef.current,
                { scale: 0.9, autoAlpha: 0 },
                { scale: 1, autoAlpha: 1, duration: 0.8 },
                "-=0.6"
            );
    }, []);

    return (
        <div className="mx-auto mt-20 flex max-w-3xl flex-col items-center gap-8 text-center relative">
            <h1 className="flex flex-wrap items-center justify-center text-6xl md:text-7xl font-bold text-white">
                <span ref={appWrapperRef} className="inline-block mr-2">
                    <span className="bg-clip-text text-transparent bg-linear-to-r from-[#6EACDA]/40 via-cyan-500/98 to-[#021526]/10 font-extrabold">
                        {t("hero.thisApp")}
                    </span>
                </span>

                <span ref={titleRef} className="text-white font-semibold md:font-bold">
                    {t("hero.title")}
                </span>
            </h1>

            <div ref={subtitleRef} className="w-full">
                <RichText
                    text={t("hero.subtitle")}
                    className="text-xl text-slate-300 font-light"
                />
            </div>

            <button
                ref={buttonRef}
                className="rounded bg-[#021526] cursor-pointer px-8 py-3 text-lg font-semibold text-white transition-all duration-300 hover:bg-[#021525]/90 hover:shadow-lg hover:shadow-[#021625]/60"
            >
                {t("hero.getStarted")}
            </button>

            <div className="flex flex-col items-center mt-20 select-none">
                <div className="flex flex-row gap-3 items-center">
                    <span className="text-white font-medium text-xl animate-pulse transition-all duration-300 ">
                        {t("hero.scrollDown")}
                    </span>
                    <BsMouse size={26} className="text-white" />
                </div>

                <span className="text-white/60 font-light text-sm mt-1">
                    {t("hero.discoverMore")}
                </span>
            </div>
        </div>
    );
}
