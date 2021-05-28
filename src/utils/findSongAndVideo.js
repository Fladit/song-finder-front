import axios from "axios";
import clientErrors from "./clientErrors";
import serverErrors from "./serverErrors";
//import {handleSongError, handleVideoError} from "./errorHandler";

const findVideo = async (videoUrl, hostURL, setVideoDuration,
                         setEmbeddedLink, setIsVideoFound, setErrorMessage) => {
    try {
        const res = await axios.post(`${hostURL}/duration`, {id: videoUrl});
        if (res.data.status === "error") {
            //const handledErrorMessage = handleVideoError(res.data.error)
            const handledErrorMessage = res.data.error.code
            console.log(handledErrorMessage)
            setErrorMessage(handledErrorMessage)
            //console.log("handledVideoError: ", handledErrorMessage)
            return ;
        }
        else setErrorMessage("")
        console.log(`Duration: ${res.data.duration}`);
        const newLink = "https://www.youtube.com/embed/" + res.data.videoID;
        setVideoDuration(res.data.duration);
        setEmbeddedLink(newLink);
        setIsVideoFound(true);
    }
    catch (e) {
        if (e.message === clientErrors.NETWORK_ERROR)
            setErrorMessage(e.message)
        else setErrorMessage(serverErrors.UNEXPECTED_SERVER_ERROR)
        //throw e;
    }
};

const findSong = async (videoUrl, hostURL, firstInputValue, secondInputValue,
                        setIsSongFound, setSongPageLink, setErrorMessage) => {
    try {
        const res = await axios.post(`${hostURL}/`,
            {id: videoUrl, start: firstInputValue, end: secondInputValue});
        if (res.data.status === "error") {
            //const handledErrorMessage = handleSongError(res.data.error)
            const handledErrorMessage = res.data.error.code
            console.log(handledErrorMessage)
            setErrorMessage(handledErrorMessage)
            //console.log("handledSongError: ", handledErrorMessage)
            return;
        }
        console.log("answer: ", res.data);
        if (res.data.result) {
            setIsSongFound(true);
            setSongPageLink(res.data.result.song_link);
        }
        else {
            console.log("song is not found")
            setErrorMessage("Песня не была найдена")
        }
    }
    catch (e) {
        setErrorMessage(e.message)
    }

};

export {findSong, findVideo}
