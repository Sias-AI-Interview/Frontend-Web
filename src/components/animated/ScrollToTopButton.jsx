import { useEffect, useState } from "react";
import { IoArrowUpCircleOutline } from "react-icons/io5";

export default function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setVisible(window.scrollY > 350);
        };
        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <>
            {visible && (
                <button
                    onClick={scrollToTop}
                    className="
            fixed bottom-6 right-6 z-50
            p-3 rounded-full
            bg-slate-900/95 backdrop-blur-xl
            border border-cyan-500/20
            shadow-lg shadow-cyan-500/10
            transition-all duration-300
            hover:shadow-cyan-400/25 hover:scale-110
            active:scale-95
          "
                >
                    <IoArrowUpCircleOutline size={36} className="text-cyan-300 drop-shadow-lg" />
                </button>
            )}
        </>
    );
}
