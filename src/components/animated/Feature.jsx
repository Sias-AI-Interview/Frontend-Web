import { useTranslation } from "react-i18next";
import { FiCheckCircle } from "react-icons/fi";

export default function SiasFeatureSection() {
    const { t } = useTranslation();

    return (
        <section className="w-full text-white py-16 px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 max-w-xl text-center lg:text-left">
                <span className="text-blue-400 text-sm font-semibold tracking-wide uppercase">
                    {t("features.badge")}
                </span>

                <h2 className="text-3xl md:text-4xl font-bold mt-2 leading-tight">
                    {t("features.title")} SIAS
                </h2>

                <p className="mt-4 text-gray-300 leading-relaxed text-sm md:text-base">
                    {t("features.subtitle")}
                </p>

                <div className="mt-8 space-y-6">
                    {Object.entries(t("features.items", { returnObjects: true })).map(
                        ([key, item]) => (
                            <div
                                key={key}
                                className="flex items-start gap-4 max-md:text-left"
                            >
                                <div className="w-10 h-10 flex items-center justify-center bg-blue-500/20 rounded-xl">
                                    <FiCheckCircle className="w-6 h-6 text-blue-400" />
                                </div>
                                <div className="text-left">
                                    <h4 className="text-lg font-semibold">{item.title}</h4>
                                    <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>

            <div className="flex-1 relative w-full h-[300px] sm:h-[360px] max-w-md mx-auto">
                {[...Array(14)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-14 h-14 sm:w-20 sm:h-20 bg-black/40 rounded-full blur-md"
                        style={{
                            top: `${Math.random() * 80}%`,
                            left: `${Math.random() * 80}%`,
                        }}
                    />
                ))}

                <div className="absolute w-32 h-32 sm:w-40 sm:h-40 bg-blue-600 blur-3xl rounded-full top-1/3 left-1/3" />

                <div className="absolute top-1/4 left-1/3 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-2xl bg-green-600 shadow-lg">
                    <FiCheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>

                <div className="absolute bottom-20 left-1/4 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-2xl bg-blue-500 shadow-lg">
                    <FiCheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>

                <div className="absolute right-1/4 top-1/2 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-2xl bg-yellow-500 shadow-lg">
                    <FiCheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
            </div>
        </section>
    );
}