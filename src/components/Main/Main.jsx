import React, {useEffect, useState} from 'react';
import "./main.css"
import SongSegmentFinder from "./SongSegmentFinder/SongSegmentFinder";
import {findVideo, findSong} from "../../utils/findSongAndVideo";
const hostURL = "http://localhost:3001"

const Main = () => {
    const [errorMessage, setErrorMessage] = useState("")
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
        setEmbeddedLink, setIsVideoFound, setErrorMessage)

    // Функция отправления запроса на сервер для получения названия песни из видео
    const findSongWrapper = async () => findSong(inputLink, hostURL, firstInputValue,
        secondInputValue, setIsSongFound, setSongPageLink, setErrorMessage)


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
                                           setFirstInputValue={setFirstInputValue} findSong={findSongWrapper}
                                           errorMessage={errorMessage}
                        />
                    </div>
                    :
                    <div>
                        {errorMessage && <div className={"main-container-error-message"}>{errorMessage}</div>}
                        <button onClick={findVideoWrapper} has-error-message={(!!errorMessage).toString()}> Найти видео </button>
                    </div>}
                </div>:
                <div className={"main-container"}>
                    {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                    <iframe className={"main-song-page"} width="560" height="400" src={songPageLink} frameBorder="0"/>
                </div>}
        </div>
    );
};



export default Main;
