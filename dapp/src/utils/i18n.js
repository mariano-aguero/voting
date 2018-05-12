import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .init({
        // we init with resources
        resources: {
            en: {
                translations: {
                    "Voting results": "Voting results",
                    "Your vote": "Your vote",
                    "You already vote! Your vote was for": "You already vote! Your vote was for",
                    "Vote for no": "Vote for no",
                    "Vote for yes": "Vote for yes",
                    "Dapp for voting": "Dapp for voting",
                    "This is a simple decentralized application to be able to vote in a binary way.": "This is a simple decentralized application to be able to vote in a binary way.",
                    "Number of voters per yes": "Number of voters per yes",
                    "Number of voters per no": "Number of voters per no",
                    "Vote succesfully submitted":  "Vote succesfully submitted",
                    "yes": "Yes",
                    "no": "No",
                }
            },
            es: {
                translations: {
                    "Voting results": "Resultado de las votaciones",
                    "Your vote": "Su voto",
                    "You already vote! Your vote was for": "Usted ya voto! Su voto fue para",
                    "Vote for no": "Vote por no",
                    "Vote for yes": "Vote por si",
                    "Dapp for voting": "App descentralizada para votar",
                    "This is a simple decentralized application to be able to vote in a binary way.": "Esta es una aplicación descentralizada simple para poder votar de forma binaria.",
                    "Number of voters per yes": "Número de votantes por si",
                    "Number of voters per no": "Número de votantes por no",
                    "Vote succesfully submitted": "Voto realizado exitosamente",
                    "yes": "Si",
                    "no": "No",
                }
            }
        },
        fallbackLng: 'en',
        debug: true,

        // have a common namespace used around the full app
        ns: ['translations'],
        defaultNS: 'translations',

        keySeparator: false, // we use content as keys

        interpolation: {
            escapeValue: false, // not needed for react!!
            formatSeparator: ','
        },

        react: {
            wait: true
        }
    });

export default i18n;
