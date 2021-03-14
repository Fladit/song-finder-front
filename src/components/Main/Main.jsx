import React, {useEffect, useMemo, useState} from 'react';
import "./main.css"
import SongSegmentFinder from "./SongSegmentFinder/SongSegmentFinder";
import {findVideo, findSong} from "../../utils/findSongAndVideo";
import useOwnLocalisation from "../../hooks/useOwnLocalisation";
import {localisationDictionary} from "../../utils/localisation";

const enumLanguages = {
    [localisationDictionary.EN]: "English",
    [localisationDictionary.RU]: "Russian"
}

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
    const localisation = useOwnLocalisation()

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
        <div>
            <div className={"main"} style={!isVideoFound? {marginTop: "30vh", height: "calc(100% - 30vh)"}
                : {marginTop: 35, height: "calc(100% - 35px)"}}>
                <div className={"main-track"}>{localisation.localisationEntries.MAIN_TITLE}</div>
                <div className={"main-insert-title"}>{localisation.localisationEntries.INSERT_VIDEO_LINK_TITLE}</div>
                <input type={"text"} maxLength={70} className={"main-input-link"}  value={inputLink} onChange={changeLink}
                       placeholder={localisation.localisationEntries.INSERT_VIDEO_LINK_PLACEHOLDER}/>
                {!isSongFound?
                    <div>
                        {isVideoFound?
                            <div className={"main-container"}>
                                <SongSegmentFinder secondInputValue={secondInputValue} firstInputValue={firstInputValue}
                                                   distinction={distinction} videoDuration={videoDuration}
                                                   embeddedLink={embeddedLink} setSecondInputValue={setSecondInputValue}
                                                   setFirstInputValue={setFirstInputValue} findSong={findSongWrapper}
                                                   errorMessage={errorMessage} localisation={localisation}
                                />
                            </div>
                            :
                            <div>
                                {errorMessage && <div className={"main-container-error-message"}>{errorMessage}</div>}
                                <button onClick={findVideoWrapper} has-error-message={(!!errorMessage).toString()}>
                                    {localisation.localisationEntries.FIND_VIDEO_BUTTON_TITLE}
                                </button>
                            </div>}
                    </div>:
                    <div className={"main-container"}>
                        {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                        <iframe className={"main-song-page"} width="560" height="400" src={songPageLink} frameBorder="0"/>
                    </div>}
            </div>
        </div>
    );
};





export default Main;
