import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import es from "./locales/es.json";

const stored = localStorage.getItem("breastustraining-language");
const initialLanguage = stored === "es" || stored === "en" ? stored : "en";

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, es: { translation: es } },
  lng: initialLanguage,
  fallbackLng: "en",
  keySeparator: false,
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

i18n.on("languageChanged", (lng) => {
  if (lng === "en" || lng === "es") localStorage.setItem("breastustraining-language", lng);
});

export default i18n;
