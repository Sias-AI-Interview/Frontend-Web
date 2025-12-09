export function QueueLoader({ position }) {
    return (
        <div className="flex flex-col items-center justify-center py-6">
            <div className="relative">
                <div className="w-20 h-20 rounded-full border-4 border-[#6EACDA]/20 animate-pulse" />
                <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent border-t-[#6EACDA] animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <span className="text-2xl font-bold text-[#6EACDA]">{position}</span>
                        <p className="text-[9px] text-[#6EACDA]/60">in queue</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-[#6EACDA]"
                        style={{
                            animation: "pulse 1.5s ease-in-out infinite",
                            animationDelay: `${i * 0.2}s`,
                            opacity: i < position ? 1 : 0.2,
                        }}
                    />
                ))}
            </div>
            <p className="text-xs text-[#6EACDA]/60 mt-3">Menunggu giliran proses...</p>
        </div>
    )
}