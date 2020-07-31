import React, {useEffect, useState} from 'react';
import "./main.css"

const Main = () => {
    const [link, setLink] = useState("");
    const [checked, setChecked] = useState(true)
    const [firstInputValue, setFirstInputValue] = useState(0)
    const [secondInputValue, setSecondInputValue] = useState(1)
    useEffect(() => {
        console.log(firstInputValue, secondInputValue)
    })

    const changeLink = (e) => {
        console.log(link);
        setLink(e.target.value);
    }
    const findVideo = () => {

    };

    const findSong = () => {

    };

    const changeFirstInputValue = (e) => {
        const value = parseInt(e.target.value);
        if (value < secondInputValue && ((secondInputValue - value) <= 15)) {
            console.log("yes ", value, " ", secondInputValue);
            setFirstInputValue(value);
            //e.preventDefault();
        }
    };

    const changeSecondInputValue = (e) => {
        const value = parseInt(e.target.value);
        //console.log(typeof e.target.value, typeof secondInputValue, "70" > 100,  70 > 100, "70" > "100")
        if (value > firstInputValue && (value - firstInputValue <= 15))
        {
            console.log("yes", firstInputValue, value);
            setSecondInputValue(value);
        }

    };

    return (
        <div className={"main"}>
            <div className={"main-track"}>Что за трек?</div>
            <div className={"main-insert-title"}>Вставьте ссылку на видео с YouTube</div>
            <input type={"text"} value={link} onChange={changeLink} placeholder={"Введите ссылку на видео...."}/>
            {checked? <div className={"main-container"}>
                {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                <iframe className={"main-youtube-player"} width="560" height="315" src="https://www.youtube.com/embed/bWv-bR_X-VM" frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen/>
                        <div className={"main-container-text-fields"}>
                            <div className={"main-container-text-fields-time"}>{"12:15:" + firstInputValue}</div>
                            <div className={"main-container-text-fields-text"}> Введите промежуток </div>
                            <div className={"main-container-text-fields-time"}>{"12:15:" + secondInputValue}</div>
                        </div>
                <div className={"range-slider"}>
                    <input type={"range"} min={"0"} max={"100"} step={"1"} value={firstInputValue} onChange={changeFirstInputValue} />
                    <input type={"range"} min={"0"} max={"100"} step={"1"} value={secondInputValue} onChange={changeSecondInputValue}/>
                </div>
                        </div>:""}
            <button onClick={!checked? findVideo : findSong}> Найти </button>
        </div>
    );
};

export default Main;