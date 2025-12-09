import { Download } from "lucide-react"
import { useEffect } from "react"
import { useState } from "react"

export function DownloadLoader({name}) {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 95) return prev
                return prev + Math.random() * 15
            })
        }, 300)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex flex-col items-center justify-center py-6">
            <div className="relative w-20 h-20">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                        <Download className="w-8 h-8 text-[#6EACDA] animate-bounce" />
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-1 h-1 rounded-full bg-[#6EACDA]"
                                style={{
                                    top: "50%",
                                    left: "50%",
                                    animation: `downloadParticle 1.5s ease-out infinite`,
                                    animationDelay: `${i * 0.25}s`,
                                    transform: `rotate(${i * 60}deg) translateY(-16px)`,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-40 mt-4">
                <div className="flex justify-between text-[10px] text-[#6EACDA]/60 mb-1">
                    <span>Downloading...</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 bg-[#1e3a5f] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-[#6EACDA] to-[#4a9bc9] rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
            <p className="text-xs text-[#6EACDA]/60 mt-3">Mengunduh dari Google Drive...</p>
        </div>
    )
}