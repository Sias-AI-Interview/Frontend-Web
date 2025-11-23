import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const active = i18n.language;

  const langs = ["en", "id"];

  return (
    <div className="flex gap-4 font-semibold">
      {langs.map((lng) => (
        <button
          key={lng}
          onClick={() => i18n.changeLanguage(lng)}
          className={`transition-all duration-300 hover:scale-110 border-b-2 pb-1 ${
            active === lng
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600"
          }`}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
