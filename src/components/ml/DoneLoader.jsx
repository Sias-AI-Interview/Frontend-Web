import { CheckCircle2 } from "lucide-react";

export function DoneLoader({ name }) {
    return (
        <div className="flex flex-col items-center justify-center py-6">
            <div className="relative">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                </div>
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full bg-green-400"
                        style={{
                            top: "50%",
                            left: "50%",
                            animation: `successParticle 1s ease-out forwards`,
                            animationDelay: `${i * 0.1}s`,
                            transform: `rotate(${i * 45}deg)`,
                        }}
                    />
                ))}
            </div>
            <p className="text-sm font-medium text-green-400 mt-3">Analisis Selesai!</p>
        </div>
    )
}