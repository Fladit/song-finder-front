import React, {useEffect, useState} from 'react';
import "./main.css"
import axios from "axios"
import getTime from "./time";
import RangeSlider from "../RangeSlider/RangeSlider";

const Main = () => {
    const hostURL = "http://localhost:3001"
    const [inputLink, setInputLink] = useState("");
    const [embeddedLink, setEmbeddedLink] = useState("");
    const [isVideoFound, setIsVideoFound] = useState(false)
    const [firstInputValue, setFirstInputValue] = useState(0)
    const [secondInputValue, setSecondInputValue] = useState(1)
    const [videoDuration, setVideoDuration] = useState(10);
    const [distinction, setDistinction] = useState(100);
    const [isSongFound, setIsSongFound] = useState(false);
    const [songPage, setSongPage] = useState("");

    //
    const changeLink = (e) => {
        console.log(e.target.value);
        setInputLink(e.target.value);
    }

    // Функция отправления запроса на сервер для получения продолжительности видео
    const findVideo = async (videoUrl) => {
        try {
            const res = await axios.post(`${hostURL}/duration`, {id: videoUrl});
            console.log(`Duration: ${res.data.duration}`);
            if (res.data.duration > 5)
            {
                const newLink = "https://www.youtube.com/embed/" + res.data.videoID;
                setVideoDuration(res.data.duration);
                setDistinction(res.data.duration /2);
                setEmbeddedLink(newLink);
                setIsVideoFound(true);
            }
        }
        catch (e) {
            throw e;
        }
    };

    // Функция отправления запроса на сервер для получения названия песни из видео
    const findSong = async (videoUrl) => {
        try {
            const res = await axios.post(`${hostURL}/`, {id: videoUrl, start: firstInputValue, end: secondInputValue});
            console.log("answer: ", res.data);
            setIsSongFound(true);
            setSongPage(res.data.result.song_link);
        }
        catch (e) {
            //Сделать обработчик ошибок
            throw e;
        }

    };


    return (
        <div className={"main"} style={!isVideoFound? {marginTop: "30vh"}: {marginTop: 35}}>
            <div className={"main-track"}>Что за трек?</div>
            <div className={"main-insert-title"}>Вставьте ссылку на видео с YouTube</div>
            <input type={"text"} maxLength={70} className={"main-input-link"}  value={inputLink} onChange={changeLink} placeholder={"Введите ссылку на видео...."}/>
            {!isSongFound? <div>
            {isVideoFound? <div className={"main-container"}>
                {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                <iframe className={"main-youtube-player"} width="560" height="370" src={embeddedLink} frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen/>
                        <div className={"main-container-text-fields"}>
                            <div className={"main-container-text-fields-time"}>{getTime(firstInputValue)}</div>
                            <div className={"main-container-text-fields-text"}> Введите промежуток </div>
                            <div className={"main-container-text-fields-time"}>{getTime(secondInputValue)}</div>
                        </div>
                <RangeSlider firstInputValue={firstInputValue} secondInputValue={secondInputValue}
                             setFirstInputValue={setFirstInputValue} setSecondInputValue={setSecondInputValue}
                             distinction={distinction} videoDuration={videoDuration}/>
                        </div>:""}
            <button onClick={ () => !isVideoFound? findVideo(inputLink) : findSong(inputLink)}> Найти </button>
            </div>:
                <div className={"main-container"}>
                    {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                    <iframe className={"main-song-page"} width="560" height="400" src={songPage} frameBorder="0"/>
                </div>}
        </div>
    );
};

export default Main;
