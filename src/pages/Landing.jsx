import { useTranslation } from "react-i18next";

export default function Home() {
    const { t } = useTranslation();

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">{t("welcome")}</h1>
            <p className="text-lg">{t("desc")}</p>
        </div>
    );
}
