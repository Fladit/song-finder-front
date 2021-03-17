import localisationDictionary from "./localisationDictionary";
import getLocalizedErrors from "./errorHandler";

const ruLocalisation = {
    MAIN_TITLE: "Что за трек?",
    INSERT_VIDEO_LINK_TITLE: "Вставьте ссылку на видео с YouTube",
    INSERT_VIDEO_LINK_PLACEHOLDER: "Введите ссылку на видео....",
    FIND_VIDEO_BUTTON_TITLE: "Найти видео",
    FIND_SONG_BUTTON_TITTLE: "Найти песню",
    CHOOSE_VIDEO_INTERVAL: "Выберите промежуток",
    TRANSLATIONS: "Переводы",
    ERRORS: getLocalizedErrors(localisationDictionary.RU)
}

const enLocalisation = {
    MAIN_TITLE: "What's the song?",
    INSERT_VIDEO_LINK_TITLE: "Insert a link to a YouTube video",
    INSERT_VIDEO_LINK_PLACEHOLDER: "Enter the link to the video....",
    FIND_VIDEO_BUTTON_TITLE: "Find video",
    FIND_SONG_BUTTON_TITTLE: "Find song",
    CHOOSE_VIDEO_INTERVAL: "Choose the desired video interval",
    TRANSLATIONS: "Translations",
    ERRORS: getLocalizedErrors(localisationDictionary.EN)
}

let currentLocalisation = ruLocalisation

function setLocalisation(localisationLanguage) {
    switch (localisationLanguage) {
        case localisationDictionary.RU: {
            currentLocalisation = ruLocalisation
            break;
        }
        case localisationDictionary.EN: {
            currentLocalisation = enLocalisation
            break;
        }
        default: {
            break;
        }
    }
}

function getLocalisation() {
    return Object.freeze(currentLocalisation)
}

export {setLocalisation, getLocalisation, localisationDictionary}
