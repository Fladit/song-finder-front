import React, {useEffect, useState} from 'react';
import "./main.css"
import axios from "axios"
import SongSegmentFinder from "./SongSegmentFinder/SongSegmentFinder";
import {handleVideoError, handleSongError} from "../../utils/errorHandler";
const hostURL = "http://localhost:3001"

const Main = () => {
    const [inputLink, setInputLink] = useState("");
    const [embeddedLink, setEmbeddedLink] = useState("");
    const [isVideoFound, setIsVideoFound] = useState(false)
    const [firstInputValue, setFirstInputValue] = useState(0)
    const [secondInputValue, setSecondInputValue] = useState(1)
    const [videoDuration, setVideoDuration] = useState(10);
    const [distinction, setDistinction] = useState(100);
    const [isSongFound, setIsSongFound] = useState(false);
    const [songPageLink, setSongPageLink] = useState("");

    //
    const changeLink = (e) => {
        console.log(e.target.value);
        setInputLink(e.target.value);
    }

    // Функция отправления запроса на сервер для получения продолжительности видео
    const findVideoWrapper = async () => findVideo(inputLink, hostURL, setVideoDuration, setDistinction,
        setEmbeddedLink, setIsVideoFound)

    // Функция отправления запроса на сервер для получения названия песни из видео
    const findSongWrapper = async () => findSong(inputLink, hostURL, firstInputValue,
        secondInputValue, setIsSongFound, setSongPageLink)


    return (
        <div className={"main"} style={!isVideoFound? {marginTop: "30vh"}: {marginTop: 35}}>
            <div className={"main-track"}>Что за трек?</div>
            <div className={"main-insert-title"}>Вставьте ссылку на видео с YouTube</div>
            <input type={"text"} maxLength={70} className={"main-input-link"}  value={inputLink} onChange={changeLink} placeholder={"Введите ссылку на видео...."}/>
            {!isSongFound?
                <div>
                {isVideoFound?
                    <div className={"main-container"}>
                        <SongSegmentFinder secondInputValue={secondInputValue} firstInputValue={firstInputValue}
                                           distinction={distinction} videoDuration={videoDuration}
                                           embeddedLink={embeddedLink} setSecondInputValue={setSecondInputValue}
                                           setFirstInputValue={setFirstInputValue} findSong={findSongWrapper}/>
                    </div>

                    :<button onClick={findVideoWrapper}> Найти видео </button>}
                </div>:
                <div className={"main-container"}>
                    {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                    <iframe className={"main-song-page"} width="560" height="400" src={songPageLink} frameBorder="0"/>
                </div>}
        </div>
    );
};

const findVideo = async (videoUrl, hostURL, setVideoDuration, setDistinction, setEmbeddedLink, setIsVideoFound) => {
    try {
        const res = await axios.post(`${hostURL}/duration`, {id: videoUrl});
        if (res.data.status === "error") {
            const handledErrorMessage = handleVideoError(res.data.error)
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

const findSong = async (videoUrl, hostURL, firstInputValue, secondInputValue, setIsSongFound, setSongPageLink) => {
    try {
        const res = await axios.post(`${hostURL}/`, {id: videoUrl, start: firstInputValue, end: secondInputValue});
        if (res.data.status === "error") {
            const handledErrorMessage = handleSongError(res.data.error)
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



export default Main;
