import { AudioWaveform } from "lucide-react"
import { Users } from "lucide-react"
import { useEffect } from "react"
import { useState } from "react"

export function DiarizationLoader({ name }) {
    const [activeSpeaker, setActiveSpeaker] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSpeaker((prev) => (prev + 1) % 3)
        }, 800)
        return () => clearInterval(interval)
    }, [])

    const speakers = [
        { label: "S1", color: "#6EACDA" },
        { label: "S2", color: "#4ade80" },
        { label: "S3", color: "#f472b6" },
    ]

    return (
        <div className="flex flex-col items-center justify-center py-6">
            <div className="relative w-28 h-28">
                {speakers.map((speaker, i) => {
                    const angle = (i * 120 - 90) * (Math.PI / 180)
                    const x = 50 + 35 * Math.cos(angle)
                    const y = 50 + 35 * Math.sin(angle)
                    const isActive = i === activeSpeaker

                    return (
                        <div
                            key={i}
                            className="absolute w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                            style={{
                                left: `${x}%`,
                                top: `${y}%`,
                                transform: "translate(-50%, -50%)",
                                backgroundColor: `${speaker.color}${isActive ? "40" : "20"}`,
                                border: `2px solid ${speaker.color}`,
                                boxShadow: isActive ? `0 0 16px ${speaker.color}60` : "none",
                                scale: isActive ? "1.15" : "1",
                            }}
                        >
                            <Users className="w-3 h-3" style={{ color: speaker.color }} />
                        </div>
                    )
                })}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-[#1e3a5f] border border-[#6EACDA]/30 flex items-center justify-center">
                        <AudioWaveform className="w-3 h-3 text-[#6EACDA]" />
                    </div>
                </div>
                <div
                    className="absolute inset-0 rounded-full border-2 border-dashed border-[#6EACDA]/30"
                    style={{ animation: "spin 8s linear infinite" }}
                />
            </div>
            <div className="mt-4 text-center">
                <p className="text-xs text-[#6EACDA]">Identifying Speakers</p>
                <p className="text-[10px] text-[#6EACDA]/60 mt-1">Memisahkan suara pembicara...</p>
            </div>
        </div>
    )
}
