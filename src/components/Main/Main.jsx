import React, {useEffect, useState} from 'react';
import "./main.css"
import axios from "axios"
import getTime from "./time";

const Main = () => {
    const hostURL = "http://localhost:3001"
    const [inputLink, setInputLink] = useState("");
    const [embedLink, setEmbedLink] = useState("");
    const [checked, setChecked] = useState(false)
    const [firstInputValue, setFirstInputValue] = useState(0)
    const [secondInputValue, setSecondInputValue] = useState(1)
    const [duration, setDuration] = useState(10);
    const [distinction, setDistinction] = useState(100);
    const [found, setFound] = useState(false);
    const [songPage, setSongPage] = useState("");

    //
    const changeLink = (e) => {
        console.log(inputLink);
        setInputLink(e.target.value);
    }

    // Функция отправления запроса на сервер для получения продолжотельности видео
    const findVideo = async (videoUrl) => {
        try {
            const res = await axios.post(`${hostURL}/duration`, {id: videoUrl});
            console.log(`Duration: ${res.data.duration}`);
            if (res.data.duration > 5)
            {
                const newLink = "https://www.youtube.com/embed/" + res.data.videoID;
                setDuration(res.data.duration);
                setDistinction(res.data.duration /2);
                setEmbedLink(newLink);
                setChecked(true);
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
            setFound(true);
            setSongPage(res.data.result.song_link);
        }
        catch (e) {
            //Сделать обработчик ошибок
            throw e;
        }

    };

    const changeFirstInputValue = (e) => {
        const value = parseInt(e.target.value);
        if (value < secondInputValue && ((secondInputValue - value) <= distinction)) {
            //console.log("yes ", value, " ", secondInputValue);
            setFirstInputValue(value);
            //e.preventDefault();
        }
    };

    const changeSecondInputValue = (e) => {
        const value = parseInt(e.target.value);
        //console.log(typeof e.target.value, typeof secondInputValue, "70" > 100,  70 > 100, "70" > "100")
        if (value > firstInputValue && (value - firstInputValue <= distinction))
        {
            //console.log("yes", firstInputValue, value);
            setSecondInputValue(value);
        }

    };

    return (
        <div className={"main"} style={!checked? {marginTop: "30vh"}: {marginTop: 35}}>
            <div className={"main-track"}>Что за трек?</div>
            <div className={"main-insert-title"}>Вставьте ссылку на видео с YouTube</div>
            <input type={"text"} maxLength={70} className={"main-input-link"}  value={inputLink} onChange={changeLink} placeholder={"Введите ссылку на видео...."}/>
            {!found? <div>
            {checked? <div className={"main-container"}>
                {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                <iframe className={"main-youtube-player"} width="560" height="370" src={embedLink} frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen/>
                        <div className={"main-container-text-fields"}>
                            <div className={"main-container-text-fields-time"}>{getTime(firstInputValue)}</div>
                            <div className={"main-container-text-fields-text"}> Введите промежуток </div>
                            <div className={"main-container-text-fields-time"}>{getTime(secondInputValue)}</div>
                        </div>
                <div className={"range-slider"}>
                    <input type={"range"} min={"0"} max={duration} step={"1"} value={firstInputValue} onChange={changeFirstInputValue} />
                    <input type={"range"} min={"0"} max={duration} step={"1"} value={secondInputValue} onChange={changeSecondInputValue}/>
                </div>
                        </div>:""}
            <button onClick={ () => !checked? findVideo(inputLink) : findSong(inputLink)}> Найти </button>
            </div>:
                <div className={"main-container"}>
                    {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                    <iframe className={"main-song-page"} width="560" height="400" src={songPage} frameBorder="0"/>
                </div>}
        </div>
    );
};

export default Main;