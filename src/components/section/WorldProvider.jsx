import WorldMapTwoLines from "../map/WorldMap"
import { useTranslation } from "react-i18next";


export default function WorldMapCode() {
    const { t } = useTranslation();
    return (
        <>
            <section className="py-40">
                <div className="container mx-auto">
                    <h2 className="text-6xl font-bold text-center mb-10 text-white">
                        {t("worldMap.title")}
                    </h2>
                    <p className="text-center text-base text-slate-300 mb-8 max-w-2xl mx-auto">
                        {t("worldMap.subtitle")}
                    </p>

                    <WorldMapTwoLines className="max-w-5xl mx-auto" />
                </div>
            </section>
        </>
    );
}
