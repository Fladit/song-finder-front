import axios from "axios";
import {handleSongError, handleVideoError} from "./errorHandler";

const findVideo = async (videoUrl, hostURL, setVideoDuration, setDistinction, setEmbeddedLink, setIsVideoFound,
                         setErrorMessage) => {
    try {
        const res = await axios.post(`${hostURL}/duration`, {id: videoUrl});
        if (res.data.status === "error") {
            const handledErrorMessage = handleVideoError(res.data.error)
            setErrorMessage(handledErrorMessage)
            console.log("handledVideoError: ", handledErrorMessage)
            return ;
        }
        console.log(`Duration: ${res.data.duration}`);
        const newLink = "https://www.youtube.com/embed/" + res.data.videoID;
        setVideoDuration(res.data.duration);
        setDistinction(res.data.duration / 2);
        setEmbeddedLink(newLink);
        setIsVideoFound(true);
    }
    catch (e) {
        throw e;
    }
};

const findSong = async (videoUrl, hostURL, firstInputValue, secondInputValue, setIsSongFound, setSongPageLink,
                        setErrorMessage) => {
    try {
        const res = await axios.post(`${hostURL}/`, {id: videoUrl, start: firstInputValue, end: secondInputValue});
        if (res.data.status === "error") {
            const handledErrorMessage = handleSongError(res.data.error)
            setErrorMessage(handledErrorMessage)
            console.log("handledSongError: ", handledErrorMessage)
            return;
        }
        console.log("answer: ", res.data);
        setIsSongFound(true);
        setSongPageLink(res.data.result.song_link);
    }
    catch (e) {
        //Сделать обработчик ошибок
        throw e;
    }

};

export {findSong, findVideo}
