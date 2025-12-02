"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { RxCaretDown } from "react-icons/rx";
import { HiMenu, HiX } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../translations/LanguageSwitcher";
import { Link, useNavigate } from "react-router-dom";
import { getAuthToken } from "@/hooks/useToken";
import { IoIosLogOut } from "react-icons/io";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "../ui/button";


export default function Navbar() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const dropdownRef = useRef(null);
    const caretRef = useRef(null);

    const [open, setOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
    const [token, setIsLoggedIn] = useState(false);
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);


    useEffect(() => {
        const checkSession = async () => {
            const session = getAuthToken();
            await Promise.resolve();
            setIsLoggedIn(!!session?.access_token);
        };
        checkSession();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("sb-ewwozsikohikpbawgjuv-auth-token");
        document.cookie = "sb-ewwozsikohikpbawgjuv-auth-token=; path=/; max-age=0";

        setIsLoggedIn(false);
        navigate("/login");
    };



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
                            <img src='/images/logo/sias.svg?v=1' className="w-13" />
                            <span className="font-cushion text-lg font-semibold tracking-wide text-white">SIAS</span>
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
                            </button>N

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

                        <Link
                            to=""
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById("how-to-use")?.scrollIntoView({
                                    behavior: "smooth"
                                });
                            }}
                            className="block text-sm text-gray-300 py-2"
                        >
                            {t("navbar.howuse")}
                        </Link>

                        <Link to="/about" className="text-sm text-gray-300 hover:text-white">
                            {t("navbar.about")}
                        </Link>

                        <LanguageSwitcher />
                    </nav>

                    {/* DESKTOP BUTTON RIGHT (no UI changes) */}
                    <div className="hidden md:flex items-center gap-3">
                        {!token ? (
                            <>
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
                            </>
                        ) : (
                            <>
                                <Link to="/dashboard">
                                    <button className="rounded border cursor-pointer border-cyan-400/50 px-6 py-2 text-sm text-gray-200 hover:border-cyan-400 hover:bg-cyan-400/5 hover:text-cyan-300">
                                        Dashboard
                                    </button>
                                </Link>
                                <Button
                                    onClick={() => setLogoutDialogOpen(true)}
                                    className="inline-flex cursor-pointer items-center gap-3 rounded bg-red-600 px-6 py-2 text-sm font-semibold text-white hover:bg-red-700"
                                >
                                    <IoIosLogOut className="text-lg font-semibold" />
                                    Logout
                                </Button>

                            </>
                        )}
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

                    <Link
                        to=""
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("how-to-use")?.scrollIntoView({
                                behavior: "smooth"
                            });
                        }}
                        className="block text-gray-300 py-2"
                    >
                        {t("navbar.howuse")}
                    </Link>

                    <Link to="/about" className="block text-gray-300 py-2">{t("navbar.about")}</Link>

                    <LanguageSwitcher />

                    {/* MOBILE BUTTON RIGHT (no UI changes) */}
                    <div className="pt-2 flex flex-col gap-3">
                        {!token ? (
                            <>
                                <Link to="/login">
                                    <button className="rounded border border-cyan-400/50 px-6 py-2 text-sm text-gray-200">
                                        {t("navbar.login")}
                                    </button>
                                </Link>
                                <Link to="/signup">
                                    <button className="rounded bg-[#021526] px-6 py-2 text-sm font-semibold text-white">
                                        {t("navbar.signup")}
                                    </button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/dashboard">
                                    <button className="rounded cursor-pointer border border-cyan-400/50 px-6 py-2 text-sm text-gray-200">
                                        Dashboard
                                    </button>
                                </Link>
                                <Button
                                    onClick={() => setLogoutDialogOpen(true)}
                                    className="inline-flex cursor-pointer items-center gap-3 rounded bg-red-600 px-6 py-2 text-sm font-semibold text-white hover:bg-red-700"
                                >
                                    <IoIosLogOut className="text-lg font-semibold" />
                                    Logout
                                </Button>

                            </>
                        )}
                    </div>
                </div>
            )}

            <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
                <DialogContent className="bg-slate-900 border-cyan-500/20 text-gray-200">
                    <DialogHeader>
                        <DialogTitle>{t("logout.title")}</DialogTitle>
                    </DialogHeader>

                    <p className="text-sm text-gray-400">{t("logout.message")}</p>

                    <DialogFooter className="mt-4 flex justify-end gap-3">
                        <Button
                            variant="secondary"
                            className="bg-gray-700 hover:bg-gray-600 text-gray-200"
                            onClick={() => setLogoutDialogOpen(false)}
                        >
                            {t("logout.cancel")}
                        </Button>

                        <Button
                            className="bg-red-600 hover:bg-red-700 text-white"
                            onClick={() => {
                                setLogoutDialogOpen(false);
                                handleLogout();
                            }}
                        >
                            {t("logout.confirm")}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>



        </header>
    );
}
