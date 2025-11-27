import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function RadialBG({ children }) {
    const layer1Ref = useRef(null);
    const layer2Ref = useRef(null);
    const layer3Ref = useRef(null);
    const scan1Ref = useRef(null);
    const scan2Ref = useRef(null);
    const waterRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ repeat: -1 });
        tl.to(scan1Ref.current, { opacity: 0.38, duration: 3, ease: "power1.inOut" })
            .to(scan1Ref.current, { opacity: 0, duration: 3, ease: "power1.inOut" }, "+=0.4");

        const tl2 = gsap.timeline({ repeat: -1, delay: 1.2 });
        tl2.to(scan2Ref.current, { opacity: 0.34, duration: 3.5, ease: "power1.inOut" })
            .to(scan2Ref.current, { opacity: 0, duration: 3.5, ease: "power1.inOut" }, "+=0.5");
    }, []);

    return (
        <div className="relative w-full min-h-screen overflow-hidden" style={{ backgroundColor: "#021526" }}>
            <div ref={layer1Ref} className="absolute inset-0 opacity-35" style={{
                backgroundImage: "radial-gradient(circle at 55% 18%, rgba(110,172,218,0.38) 0%, rgba(110,172,218,0.18) 28%, transparent 55%)",
                backgroundSize: "160% 160%", filter: "blur(110px)"
            }} />
            <div ref={layer2Ref} className="absolute inset-0 opacity-28" style={{
                backgroundImage: `
                    radial-gradient(circle at 12% 85%, rgba(115,115,115,0.24) 0%, rgba(115,115,115,0.12) 32%, transparent 58%),
                    radial-gradient(circle at 88% 12%, rgba(115,115,115,0.22) 0%, rgba(115,115,115,0.10) 35%, transparent 60%)
                `,
                backgroundSize: "170% 170%", filter: "blur(130px)"
            }} />
            <div ref={layer3Ref} className="absolute inset-0 opacity-22" style={{
                backgroundImage: "radial-gradient(circle at 50% 50%, rgba(110,172,218,0.16) 0%, rgba(115,115,115,0.10) 45%, transparent 82%)",
                backgroundSize: "200% 200%", filter: "blur(160px)"
            }} />

            <div ref={scan1Ref} className="absolute rounded-full border border-white/6"
                style={{
                    width: "1250px",
                    height: "1250px",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    opacity: 0
                }} />
            <div ref={scan2Ref} className="absolute rounded-full border border-white/5"
                style={{
                    width: "850px",
                    height: "850px",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    opacity: 0
                }} />

            <div ref={waterRef} className="absolute top-[74%] left-1/2 -translate-x-1/2 h-72 w-72 pointer-events-none">
                <div className="absolute inset-0">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute border border-white/10 rounded-full animate-ripple"
                            style={{
                                width: `${40 + i * 20}%`,
                                height: `${40 + i * 20}%`,
                                top: `${(100 - (40 + i * 20)) / 2}%`,
                                left: `${(100 - (40 + i * 20)) / 2}%`,
                                animationDelay: `${i * 0.12}s`
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="relative z-10">{children}</div>
        </div>
    );
}
