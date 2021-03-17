import serverErrors from "../utils/serverErrors"
import localisationDictionary from "./localisationDictionary";

const ruErrorLocalisation = {
    [serverErrors.UNEXPECTED_SERVER_ERROR]: "Произошла непредвиденная ошибка, попробуйте позже",
    [serverErrors.REQUEST_LIMIT_ERROR]: "Превышен лимит запросов! Не более 3 запросов за 1 минуту",
    [serverErrors.SHORT_VIDEO_ERROR]: "Видео слишком короткое. Продолжительность должна быть не менее 5 секунд",
    [serverErrors.INCORRECT_VIDEO_LINK_ERROR]: "Ссылка на видео некорректна",
    [serverErrors.INCORRECT_VIDEO_PARAMETERS_ERROR_BAD_START_TIME]: "Значение начала промежутка видео должно быть не меньше 0",
    [serverErrors.INCORRECT_VIDEO_PARAMETERS_ERROR_BAD_END_TIME]: "Значение конца промежутка видео не может быть меньше значения начала",
    [serverErrors.INCORRECT_VIDEO_PARAMETERS_ERROR_BAD_DURATION]: "Продолжительность отрезка видео должна быть не менее 5 секунд",
    [serverErrors.YOUTUBE_API_ERROR]: "Произошла непредвиденная ошибка работы YouTube, попробуйте позже",
    [serverErrors.RECOGNITION_FAILED_ERROR]: "Произошла ошибка распознавания музыки, попробуйте позже",
}

const enErrorLocalisation = {
    [serverErrors.UNEXPECTED_SERVER_ERROR]: "Unexpected server error, please, try again later",
    [serverErrors.REQUEST_LIMIT_ERROR]: "Request limit exceeded! Not more than 3 requests per 1 minute",
    [serverErrors.SHORT_VIDEO_ERROR]: "The video is too short. No less than 5 seconds",
    [serverErrors.INCORRECT_VIDEO_LINK_ERROR]: "Incorrect video link",
    [serverErrors.INCORRECT_VIDEO_PARAMETERS_ERROR_BAD_START_TIME]: "Start of video must be not less than 0",
    [serverErrors.INCORRECT_VIDEO_PARAMETERS_ERROR_BAD_END_TIME]: "End of video must be more than start",
    [serverErrors.INCORRECT_VIDEO_PARAMETERS_ERROR_BAD_DURATION]: "Duration of video must be 5 sec or more",
    [serverErrors.YOUTUBE_API_ERROR]: "Problems with interaction with the Youtube, please, try again later",
    [serverErrors.RECOGNITION_FAILED_ERROR]: "Recognition is failed, please try again later",
}

function getLocalizedErrors(language) {
    switch (language) {
        case localisationDictionary.RU: {
            return ruErrorLocalisation;
        }
        case localisationDictionary.EN: {
            return enErrorLocalisation;
        }
        default: {
            return enErrorLocalisation;
        }
    }
}

/*
function handleVideoError({message, code, name}) {
    switch (name) {
        case serverErrors.INCORRECT_VIDEO_LINK_ERROR: {
            return "Ссылка на видео некорректна";
        }
        case serverErrors.INCORRECT_VIDEO_PARAMETERS_ERROR: {
            return "Введены неверные параметры видео";
        }
        case  serverErrors.REQUEST_LIMIT_ERROR: {
            return "Превышен лимит запросов";
        }
        case serverErrors.SHORT_VIDEO_ERROR: {
            return "Слишком короткое видео, длительность должна быть не менее 5 секунд";
        }
        case serverErrors.UNEXPECTED_SERVER_ERROR: {
            return "Произошла непредвиденная ошибка сервера";
        }
        case serverErrors.YOUTUBE_API_ERROR: {
            return "Произошла непредвиденная ошибка YouTube";
        }
        default: {
            return "Произошла непредвиденная ошибка";
        }
    }
}

function handleSongError({message, code, name}) {
    switch (name) {
        case serverErrors.RECOGNITION_FAILED_ERROR: {
            return "Произошла ошибка распознавания музыки";
        }
        case serverErrors.UNEXPECTED_SERVER_ERROR: {
            return "Произошла непредвиденная ошибка сервера";
        }
        default: {
            return "Произошла непредвиденная ошибка";
        }
    }
}

export {handleVideoError, handleSongError}

 */

export default getLocalizedErrors
