import { useState, useRef, useEffect } from "react";
import LanguageSwitcher from "../translations/LanguageSwitcher.jsx";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { RxCaretDown } from "react-icons/rx";
import gsap from "gsap";

export default function Navbar() {
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const caretRef = useRef(null);

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
        <nav className="w-full flex items-center justify-between py-4 px-8 bg-white shadow">

            <div className="flex items-center">
                <h2 className="text-xl font-bold">SIAS</h2>

                <div className="h-6 w-px bg-gray-300 mx-12" />

                <div className="flex items-center gap-8 font-medium">
                    <div
                        className="relative"
                        onMouseEnter={() => setOpen(true)}
                        onMouseLeave={() => setOpen(false)}
                    >
                        <button className="flex items-center gap-1 cursor-pointer font-light hover:text-blue-600 transition">
                            {t("navbar.products.title")}
                            <span ref={caretRef}>
                                <RxCaretDown size={14} />
                            </span>
                        </button>

                        <div
                            ref={dropdownRef}
                            className="absolute bg-white shadow rounded py-2 mt-2 w-40 opacity-0 hidden"
                            style={{ transform: "translateY(-8px)" }}
                        >
                            <Link to="/product1" className="block px-4 py-2 hover:bg-gray-100">
                                {t("navbar.products.items.product1")}
                            </Link>
                            <Link to="/product2" className="block px-4 py-2 hover:bg-gray-100">
                                {t("navbar.products.items.product2")}
                            </Link>
                            <Link to="/product3" className="block px-4 py-2 hover:bg-gray-100">
                                {t("navbar.products.items.product3")}
                            </Link>
                        </div>
                    </div>


                    <Link to="/about" className="font-light hover:text-blue-600 transition">
                        {t("navbar.about")}
                    </Link>

                    <LanguageSwitcher />
                </div>
            </div>


            <div className="flex items-center gap-6">
                <Link to="/login" className="font-light hover:text-blue-600 transition">
                    {t("navbar.login")}
                </Link>

                <Link to="/signup" className="font-light hover:text-blue-600 transition">
                    {t("navbar.signup")}
                </Link>
            </div>
        </nav>
    );
}
