import { useRef, useEffect } from "react";
import gsap from "gsap";


export default function AnimatedBG() {
    const spotRef = useRef(null);

    useEffect(() => {
        const anim = gsap.to(spotRef.current, {
            x: "+=120",
            y: "+=80",
            duration: 6,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
        });

        return () => anim.kill();
    }, []);

    return (
        <div className="absolute inset-0 bg-[#041f28] overflow-hidden">
            <div ref={spotRef} className="radial-spot"></div>
        </div>
    );
}
