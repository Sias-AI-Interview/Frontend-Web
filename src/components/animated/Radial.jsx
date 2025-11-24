"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function RadialBG({ children }) {
    const containerRef = useRef(null);
    const layer1Ref = useRef(null);
    const layer2Ref = useRef(null);
    const layer3Ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(layer1Ref.current, {
                duration: 12,
                backgroundPosition: "50% 25%",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
            gsap.to(layer2Ref.current, {
                duration: 14,
                backgroundPosition: "55% 60%",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
            gsap.to(layer3Ref.current, {
                duration: 16,
                backgroundPosition: "40% 35%",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full min-h-screen overflow-hidden"
            style={{ backgroundColor: "#021526" }}
        >
            <div
                ref={layer1Ref}
                className="absolute inset-0 opacity-35"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 55% 18%, rgba(110,172,218,0.38) 0%, rgba(110,172,218,0.18) 28%, transparent 55%)",
                    backgroundSize: "160% 160%",
                    filter: "blur(110px)",
                }}
            />

            <div
                ref={layer2Ref}
                className="absolute inset-0 opacity-28"
                style={{
                    backgroundImage: `
                        radial-gradient(circle at 12% 85%, rgba(115,115,115,0.24) 0%, rgba(115,115,115,0.12) 32%, transparent 58%),
                        radial-gradient(circle at 88% 12%, rgba(115,115,115,0.22) 0%, rgba(115,115,115,0.10) 35%, transparent 60%)
                    `,
                    backgroundSize: "170% 170%",
                    filter: "blur(130px)",
                }}
            />

            <div
                ref={layer3Ref}
                className="absolute inset-0 opacity-22"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 50% 50%, rgba(110,172,218,0.16) 0%, rgba(115,115,115,0.10) 45%, transparent 82%)",
                    backgroundSize: "200% 200%",
                    filter: "blur(160px)",
                }}
            />

            {/* Top glowing divider */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent shadow-cyan-400/30" />

            <div className="relative z-10">{children}</div>
        </div>
    );
}
