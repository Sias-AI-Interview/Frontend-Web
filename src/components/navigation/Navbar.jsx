"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { RxCaretDown } from "react-icons/rx";
import { HiMenu, HiX } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../translations/LanguageSwitcher";
import { Link } from "react-router-dom";

export default function Navbar() {
    const { t } = useTranslation();

    const dropdownRef = useRef(null);
    const caretRef = useRef(null);

    const [open, setOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

    useEffect(() => {
        if (!dropdownRef.current || !caretRef.current) return;

        if (open) {
            gsap.to(dropdownRef.current, {
                opacity: 1,
                y: 0,
                display: "block",
                duration: 0.25,
            });
            gsap.to(caretRef.current, { rotate: 180, duration: 0.25 });
        } else {
            gsap.to(dropdownRef.current, {
                opacity: 0,
                y: -8,
                duration: 0.25,
                onComplete: () => {
                    if (dropdownRef.current) dropdownRef.current.style.display = "none";
                },
            });
            gsap.to(caretRef.current, { rotate: 0, duration: 0.25 });
        }
    }, [open]);

    return (
        <header className="relative z-50 border-b border-cyan-500/30 bg-slate-900/80 backdrop-blur-sm">
            <div className="mx-auto max-w-screen-xl px-6 md:px-20 py-4">
                <div className="flex items-center justify-between">

                    <Link to='/'>
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded border border-cyan-400 bg-cyan-500/10">
                                <span className="text-sm font-bold text-cyan-300">S</span>
                            </div>
                            <span className="text-lg font-semibold tracking-wide text-white">SIAS</span>
                        </div>
                    </Link>

                    <nav className="hidden md:flex flex-1 items-center ml-8 gap-8">
                        <div
                            className="relative"
                            onMouseEnter={() => setOpen(true)}
                            onMouseLeave={() => setOpen(false)}
                        >
                            <button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white">
                                {t("navbar.products.title")}
                                <div ref={caretRef} className="origin-center">
                                    <RxCaretDown />
                                </div>
                            </button>

                            <div
                                ref={dropdownRef}
                                className="absolute left-0 top-full mt-2 w-48 rounded border border-cyan-500/20 bg-slate-900 shadow-lg opacity-0"
                                style={{ transform: "translateY(-8px)", display: "none" }}
                            >
                                <Link className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-300">
                                    {t("navbar.products.items.product1")}
                                </Link>
                                <Link className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-300">
                                    {t("navbar.products.items.product2")}
                                </Link>
                                <Link className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-300">
                                    {t("navbar.products.items.product3")}
                                </Link>
                            </div>
                        </div>

                        <Link to="#how-to-use" className="text-sm text-gray-300 hover:text-white">
                            {t("navbar.howuse")}
                        </Link>

                        <Link to="/about" className="text-sm text-gray-300 hover:text-white">
                            {t("navbar.about")}
                        </Link>

                        <LanguageSwitcher />
                    </nav>

                    <div className="hidden md:flex items-center gap-3">
                        <Link to="/login">
                            <button className="rounded border border-cyan-400/50 px-6 py-2 text-sm text-gray-200 hover:border-cyan-400 hover:bg-cyan-400/5 hover:text-cyan-300">
                                {t("navbar.login")}
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button className="rounded bg-[#021526] px-6 py-2 text-sm font-semibold text-white hover:bg-[#021526]/40 hover:shadow-lg hover:shadow-[#021526]/30">
                                {t("navbar.signup")}
                            </button>
                        </Link>
                    </div>

                    <button
                        className="md:hidden text-white text-3xl"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <HiX /> : <HiMenu />}
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden absolute left-0 right-0 top-full w-full px-6 pb-6 space-y-3 bg-slate-900/95 backdrop-blur-xl border-t border-cyan-500/20 z-50">
                    <div>
                        <button
                            onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                            className="flex items-center justify-between w-full text-gray-200 py-2"
                        >
                            {t("navbar.products.title")}
                            <RxCaretDown
                                className={`${mobileDropdownOpen ? "rotate-180" : ""} transition-all`}
                            />
                        </button>

                        {mobileDropdownOpen && (
                            <div className="pl-4 space-y-2">
                                <Link to="#" className="block text-gray-300 py-1">{t("navbar.products.items.product1")}</Link>
                                <Link to="#" className="block text-gray-300 py-1">{t("navbar.products.items.product2")}</Link>
                                <Link to="#" className="block text-gray-300 py-1">{t("navbar.products.items.product3")}</Link>
                            </div>
                        )}
                    </div>

                    <Link to="#how-to-use" className="block text-gray-300 py-2">{t("navbar.howuse")}</Link>
                    <Link to="/about" className="block text-gray-300 py-2">{t("navbar.about")}</Link>

                    <LanguageSwitcher />

                    <div className="pt-2 flex flex-col gap-3">
                        <Link to="/login">
                            <button className="rounded border border-cyan-400/50 px-6 py-2 text-sm text-gray-200 hover:border-cyan-400 hover:bg-cyan-400/5 hover:text-cyan-300">
                                {t("navbar.login")}
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button className="rounded bg-[#021526] px-6 py-2 text-sm font-semibold text-white hover:bg-[#021526]/40 hover:shadow-lg hover:shadow-[#021526]/30">
                                {t("navbar.signup")}
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
