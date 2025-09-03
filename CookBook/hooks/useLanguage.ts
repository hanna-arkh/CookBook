import { useTranslation } from 'react-i18next'

export const useLanguage = () => {
  const { i18n } = useTranslation()
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }
  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'ru' : 'en'
    i18n.changeLanguage(newLanguage)
  }

  return {
    currentLanguage: i18n.language,
    changeLanguage,
    toggleLanguage,
    isEnglish: i18n.language === 'en',
    isRussian: i18n.language === 'ru',
  }
}
