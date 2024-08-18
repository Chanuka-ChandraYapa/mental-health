// src/i18n.js

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en/translation.json";
import siTranslation from "./locales/si/translation.json";
import taTranslation from "./locales/ta/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    si: {
      translation: siTranslation,
    },
    ta: {
      translation: taTranslation,
    },
  },
  lng: "en", // default language
  fallbackLng: "en",
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
