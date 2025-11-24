"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { RxCaretDown } from "react-icons/rx";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../translations/LanguageSwitcher";

export default function Navbar() {
    const { t } = useTranslation();
    const headerRef = useRef(null);
    const dropdownRef = useRef(null);
    const caretRef = useRef(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(headerRef.current, {
                duration: 0.8,
                opacity: 0,
                y: -20,
                ease: "power3.out",
            });
        });
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (open) {
            gsap.to(dropdownRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.25,
                ease: "power2.out",
                display: "block",
            });
            gsap.to(caretRef.current, {
                rotate: 180,
                duration: 0.25,
                ease: "power2.out",
            });
        } else {
            gsap.to(dropdownRef.current, {
                opacity: 0,
                y: -8,
                duration: 0.25,
                ease: "power2.out",
                onComplete: () => {
                    if (dropdownRef.current) dropdownRef.current.style.display = "none";
                },
            });
            gsap.to(caretRef.current, {
                rotate: 0,
                duration: 0.25,
                ease: "power2.out",
            });
        }
    }, [open]);

    return (
        <header
            ref={headerRef}
            className="relative z-20 border-b border-cyan-500/30 bg-gradient-to-b from-cyan-950/50 to-transparent backdrop-blur-sm"
        >
            <div className="mx-auto px-20 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded border border-cyan-400 bg-cyan-500/10">
                            <span className="text-sm font-bold text-cyan-300">S</span>
                        </div>
                        <span className="text-lg font-semibold tracking-wide text-white">SIAS</span>
                    </div>

                    <div className="mx-8 hidden h-6 w-px bg-gray-500/30 md:block" />

                    <nav className="hidden flex-1 items-center gap-8 md:flex">
                        <div
                            className="relative"
                            onMouseEnter={() => setOpen(true)}
                            onMouseLeave={() => setOpen(false)}
                        >
                            <button className="flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-white">
                                {t("navbar.products.title")}
                                <div ref={caretRef} className="origin-center">
                                    <RxCaretDown />
                                </div>
                            </button>

                            <div
                                ref={dropdownRef}
                                className="absolute left-0 top-full mt-2 w-48 rounded border border-cyan-500/20 bg-slate-900/95 backdrop-blur-md opacity-0 shadow-lg"
                                style={{ transform: "translateY(-8px)", display: "none" }}
                            >
                                <a
                                    href="#"
                                    className="block px-4 py-2.5 text-sm text-gray-300 transition-colors hover:bg-cyan-500/10 hover:text-cyan-300"
                                >
                                    {t("navbar.products.items.product1")}
                                </a>
                                <a
                                    href="#"
                                    className="block px-4 py-2.5 text-sm text-gray-300 transition-colors hover:bg-cyan-500/10 hover:text-cyan-300"
                                >
                                    {t("navbar.products.items.product2")}
                                </a>
                                <a
                                    href="#"
                                    className="block px-4 py-2.5 text-sm text-gray-300 transition-colors hover:bg-cyan-500/10 hover:text-cyan-300"
                                >
                                    {t("navbar.products.items.product3")}
                                </a>
                            </div>
                        </div>

                        <a href="#how-to-use" className="text-sm text-gray-300 transition-colors hover:text-white">
                            {t("navbar.howuse")}
                        </a>

                        <a href="#" className="text-sm text-gray-300 transition-colors hover:text-white">
                            {t("navbar.about")}
                        </a>


                        <LanguageSwitcher />
                    </nav>

                    <div className="flex items-center gap-3">
                        <button className="rounded border border-cyan-400/50 px-6 py-2 text-sm font-medium text-gray-200 transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400/5 hover:text-cyan-300">
                            {t("navbar.login")}
                        </button>
                        <button className="rounded bg-[#021526] px-6 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#021526]/40 hover:shadow-lg hover:shadow-[#021526]/30">
                            {t("navbar.signup")}
                        </button>
                    </div>
                </div>
            </div>

            {/* <div className="absolute bottom-0 left-1/2 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent" /> */}
        </header>
    );
}
