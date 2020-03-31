import i18n from "i18next";
import {initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    // we init with resources
    resources: {
        en: {
            translations: {
                welcome: "Welcome to Mango!"
            }
        },
        mn: { 
            translations: {
                welcome: "Манго-д Тавтай морилно уу!"
            }
        }
    },
    fallbackLng: "en",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",
    keySeparator: false, // we use content as keys

    interpolation: {
        escapeValue: false, // not needed for react!!
        formatSeparator: ","
      },
    
      react: {
        wait: true
      }
});
export default i18n;