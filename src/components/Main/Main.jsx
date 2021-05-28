import React, {useEffect, useMemo, useState} from 'react';
import "./main.css"
import SongSegmentFinder from "./SongSegmentFinder/SongSegmentFinder";
import {findVideo, findSong} from "../../utils/findSongAndVideo";
import useOwnLocalisation from "../../hooks/useOwnLocalisation";
import Translations from "./Translations/Translations";
import serverErrors from "../../utils/serverErrors";

const hostURL = "http://localhost:3001"

const Main = () => {
    const [errorMessage, setErrorMessage] = useState("")
    const [inputLink, setInputLink] = useState("");
    const [embeddedLink, setEmbeddedLink] = useState("");
    const [isVideoFound, setIsVideoFound] = useState(false)
    const [firstInputValue, setFirstInputValue] = useState(0)
    const [secondInputValue, setSecondInputValue] = useState(1)
    const [videoDuration, setVideoDuration] = useState(10);
    const [isSongFound, setIsSongFound] = useState(false);
    const [songPageLink, setSongPageLink] = useState("");
    const localisation = useOwnLocalisation()
    const handledError = useMemo(() => {
        return handleError(errorMessage, localisation.localisationEntries.ERRORS)
    }, [errorMessage, localisation])

    //
    const changeLink = (e) => {
        console.log(e.target.value);
        setInputLink(e.target.value);
    }

    // Функция отправления запроса на сервер для получения продолжительности видео
    const findVideoWrapper = async () => findVideo(inputLink, hostURL, setVideoDuration,
        setEmbeddedLink, setIsVideoFound, setErrorMessage)

    // Функция отправления запроса на сервер для получения названия песни из видео
    const findSongWrapper = async () => findSong(inputLink, hostURL, firstInputValue,
        secondInputValue, setIsSongFound, setSongPageLink, setErrorMessage)


    return (
        <div>
            <Translations localisation={localisation} />
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
                                                   videoDuration={videoDuration}
                                                   embeddedLink={embeddedLink} setSecondInputValue={setSecondInputValue}
                                                   setFirstInputValue={setFirstInputValue} findSong={findSongWrapper}
                                                   localisation={localisation} handledError={handledError}
                                                   setErrorMessage={setErrorMessage}
                                />
                            </div>
                            :
                            <div>
                                {handledError && <div className={"main-container-error-message"}>{handledError}</div>}
                                <button onClick={findVideoWrapper} has-error-message={(!!handledError).toString()}>
                                    {localisation.localisationEntries.FIND_VIDEO_BUTTON_TITLE}
                                </button>
                            </div>}
                    </div>:
                    <div className={"main-container"}>
                        {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                        <iframe className={"main-song-page"} width="560" height="600" src={songPageLink} frameBorder="0"/>
                    </div>}
            </div>
        </div>
    );
};

function handleError(errorMessage, localizedErrors) {
    if (errorMessage === "")
        return ""
    if (localizedErrors.hasOwnProperty(errorMessage))
        return localizedErrors[errorMessage]
    return localizedErrors[serverErrors.UNEXPECTED_SERVER_ERROR]
}





export default Main;
