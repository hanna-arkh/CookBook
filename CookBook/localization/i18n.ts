import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslation from '@/localization/locales/en.json'
import ruTranslation from '@/localization/locales/ru.json'
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    ru: { translation: ruTranslation },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
