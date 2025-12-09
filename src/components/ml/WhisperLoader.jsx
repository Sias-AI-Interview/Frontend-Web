import { Zap } from "lucide-react";
import { Brain } from "lucide-react";

export function WhisperLoader({name}) {
    return (
        <div className="flex flex-col items-center justify-center py-6">
            <div className="relative w-28 h-20">
                <div className="flex items-center justify-center gap-0.5 h-full">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="w-1 bg-gradient-to-t from-[#6EACDA] to-[#6EACDA]/40 rounded-full"
                            style={{
                                animation: "waveform 1s ease-in-out infinite",
                                animationDelay: `${i * 0.1}s`,
                                height: "16px",
                            }}
                        />
                    ))}
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
                    <div className="w-8 h-8 rounded-full bg-[#0d1e30] border-2 border-[#6EACDA] flex items-center justify-center">
                        <Brain className="w-4 h-4 text-[#6EACDA]" />
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center gap-2">
                <Zap className="w-3 h-3 text-yellow-400 animate-pulse" />
                <span className="text-xs text-[#6EACDA]">Whisper AI Processing</span>
            </div>
            <p className="text-[10px] text-[#6EACDA]/60 mt-1">Mengkonversi audio menjadi teks...</p>
            <div className="flex gap-1 mt-3">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-[#6EACDA]"
                        style={{
                            animation: "bounce 1s ease-in-out infinite",
                            animationDelay: `${i * 0.2}s`,
                        }}
                    />
                ))}
            </div>
        </div>
    )
}
