import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from '../public/locales/en.json';
import ptBRTranslations from '../public/locales/pt-br.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      'pt-BR': {
        translation: ptBRTranslations
      }
    },
    lng: localStorage.getItem('language') || 'pt-BR',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 