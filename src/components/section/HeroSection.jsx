import { useTranslation } from "react-i18next";
import RichText from "../../utils/RichText";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function HeroSection() {
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
                { scale: 0.8, autoAlpha: 0 },
                { scale: 1, autoAlpha: 1, duration: 0.8 },
                "-=0.5"
            );
    }, []);

    return (
        <div className="mx-auto mt-20 flex max-w-3xl flex-col items-center gap-8 text-center relative">
            <h1 className="flex flex-wrap items-center justify-center text-6xl md:text-7xl font-bold text-white">
                <span ref={appWrapperRef} className="inline-block mr-2">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 font-extrabold">
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
                className="rounded bg-[#021526] px-8 py-3 text-lg font-semibold text-white transition-all duration-300 hover:bg-[#021526]/40 hover:shadow-lg hover:shadow-[#021526]/30"
            >
                {t("hero.getStarted")}
            </button>
        </div>
    );
}
