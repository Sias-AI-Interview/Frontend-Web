"use client";
import { useRef } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";

export default function WorldMap() {
    const svgRef = useRef(null);
    const map = new DottedMap({ height: 100, grid: "diagonal" });

    const svgMap = map.getSVG({
        radius: 0.22,
        color: "#FFFFFF40",
        shape: "circle",
        backgroundColor: "black",
    });

    const projectPoint = (lat, lng) => {
        const x = (lng + 180) * (800 / 360);
        const y = (90 - lat) * (400 / 180);
        return { x, y };
    };

    const createCurvedPath = (start, end) => {
        const midX = (start.x + end.x) / 2;
        const midY = Math.min(start.y, end.y) - 60;
        return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
    };

    const dots = [
        {
            name: "",
            flag: "🇮🇩",
            lat: -6.2088,
            lng: 106.8456
        },
        {
            name: "",
            flag: "🇬🇧",
            lat: 51.5074,
            lng: -0.1278
        },
    ];

    const routes = [
        { from: dots[0], to: dots[1] },
        { from: dots[1], to: dots[0] },
    ];

    return (
        <div className="w-full aspect-[2/1] bg-[#021526]/80 rounded-lg relative font-sans overflow-hidden">
            <img
                src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
                className="h-full w-full opacity-[0.65] pointer-events-none select-none [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)]"
                alt="world map"
                draggable={false}
            />

            <svg
                ref={svgRef}
                viewBox="0 0 800 400"
                className="w-full h-full absolute inset-0 pointer-events-none select-none"
            >
                {routes.map((route, i) => {
                    const startPoint = projectPoint(route.from.lat, route.from.lng);
                    const endPoint = projectPoint(route.to.lat, route.to.lng);
                    return (
                        <motion.path
                            key={i}
                            d={createCurvedPath(startPoint, endPoint)}
                            stroke="url(#path-gradient)"
                            strokeWidth="1.5"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{
                                duration: 2.5,
                                delay: 0.6 * i,
                                ease: "easeInOut",
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                        />
                    );
                })}

                <defs>
                    <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="white" stopOpacity="0" />
                        <stop offset="8%" stopColor="#4AB5FF" stopOpacity="1" />
                        <stop offset="92%" stopColor="#4AB5FF" stopOpacity="1" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {dots.map((dot, i) => {
                    const p = projectPoint(dot.lat, dot.lng);
                    return (
                        <g key={i}>
                            <circle cx={p.x} cy={p.y} r="3" fill="#4AB5FF" />
                            <text
                                x={p.x + 6}
                                y={p.y - 6}
                                fontSize="10"
                                fill="white"
                                style={{ userSelect: "none" }}
                            >
                                {dot.flag} {dot.name}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}
