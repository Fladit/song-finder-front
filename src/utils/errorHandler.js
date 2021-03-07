import serverErrors from "../utils/serverErrors"

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
