"use client";

import { useTranslation } from "react-i18next";
import { Mic2, Sparkles, LayoutDashboard, ScanFace, ShieldCheck, Clock } from "lucide-react";

export default function ProductsFeatureSection() {
    const { t } = useTranslation();

    const cards = [
        {
            key: "product1",
            anchorId: "stt_dznt",
            icon: Mic2,
            iconBg: "from-pink-500 to-fuchsia-500",
            badgeColor: "bg-emerald-500/15 text-emerald-200",
            badgeIcon: ShieldCheck,
            metricIcon: ScanFace,
        },
        {
            key: "product2",
            anchorId: "ai_assessment",
            icon: Sparkles,
            iconBg: "from-cyan-500 to-sky-500",
            badgeColor: "bg-cyan-500/15 text-cyan-200",
            badgeIcon: Sparkles,
            metricIcon: Sparkles,
        },
        {
            key: "product3",
            anchorId: "clean_ui",
            icon: LayoutDashboard,
            iconBg: "from-indigo-500 to-blue-500",
            badgeColor: "bg-indigo-500/15 text-indigo-200",
            badgeIcon: Clock,
            metricIcon: Clock,
        },
    ];

    return (
        <section
            id="products"
            className="mx-auto max-w-6xl px-6 md:px-8 py-10 md:py-16 space-y-6"
        >
            <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-semibold text-white">
                    {t("landing.products.title")}
                </h2>
                <p className="text-sm md:text-base text-gray-400 max-w-2xl">
                    {t("landing.products.subtitle")}
                </p>
            </div>

            <div className="space-y-4 md:space-y-6">
                {cards.map((card) => {
                    const Icon = card.icon;
                    const BadgeIcon = card.badgeIcon;
                    const MetricIcon = card.metricIcon;

                    return (
                        <div
                            key={card.key}
                            id={card.anchorId}
                            className="relative overflow-hidden rounded-3xl border border-emerald-500/10 bg-slate-900/80 backdrop-blur-md shadow-[0_0_40px_rgba(34,197,235,0.08)]"
                        >
                            {/* subtle gradient background */}
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-cyan-500/5 to-transparent opacity-80" />

                            <div className="relative flex flex-col md:flex-row items-start gap-4 md:gap-6 px-5 md:px-8 py-5 md:py-6">
                                {/* icon */}
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-slate-900/80 to-slate-800/80">
                                    <div
                                        className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr ${card.iconBg}`}
                                    >
                                        <Icon className="h-5 w-5 text-white" />
                                    </div>
                                </div>

                                {/* text content */}
                                <div className="flex-1 w-full space-y-3">
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <p className="text-base md:text-lg font-semibold text-white">
                                            {t(`landing.products.items.${card.key}.title`)}
                                        </p>

                                        <span
                                            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-medium ${card.badgeColor}`}
                                        >
                                            <BadgeIcon className="h-3 w-3" />
                                            {t(`landing.products.items.${card.key}.badge`)}
                                        </span>
                                    </div>

                                    <p className="text-sm md:text-[15px] text-gray-300 leading-relaxed">
                                        {t(`landing.products.items.${card.key}.description`)}
                                    </p>

                                    <div className="mt-2 flex items-center gap-2 text-xs md:text-sm text-emerald-300">
                                        <MetricIcon className="h-4 w-4" />
                                        <span>
                                            {t(`landing.products.items.${card.key}.metric`)}
                                        </span>
                                    </div>
                                </div>

                                {/* arrow on the right for desktop (opsional) */}
                                <div className="hidden md:flex items-center justify-center self-stretch">
                                    <div className="h-9 w-9 rounded-full border border-cyan-500/30 flex items-center justify-center text-cyan-300/80">
                                        <span className="translate-x-[1px] text-lg">➜</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
