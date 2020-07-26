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
        if (value >= secondInputValue) {
            console.log("no ", value, " ", secondInputValue)
            //e.preventDefault();
        }
        else {
            console.log("yes ", value, " ", secondInputValue);
            setFirstInputValue(value);
        }
    };

    const changeSecondInputValue = (e) => {
        const value = parseInt(e.target.value);
        //console.log(typeof e.target.value, typeof secondInputValue, "70" > 100,  70 > 100, "70" > "100")
        if (value <= firstInputValue)
        {
            e.preventDefault();
        }
        else {
            setSecondInputValue(value);
            console.log(firstInputValue + " " + value + "(" + secondInputValue + ")", value, ">", firstInputValue, " is ", value > firstInputValue)
        }

    };

    return (
        <div className={"main"}>
            <div className={"main-track"}>Что за трек?</div>
            <div className={"main-insert-title"}>Вставьте ссылку на видео с YouTube</div>
            <input type={"text"} value={link} onChange={changeLink} placeholder={"Введите ссылку на видео...."}/>
            {checked? <div>
                {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                <iframe className={"main-youtube-player"} width="560" height="315" src="https://www.youtube.com/embed/bWv-bR_X-VM" frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen/></div> : ""}
            <button onClick={!checked? findVideo : findSong}> Найти </button>
            <input type={"range"} min={"0"} max={"100"} step={"1"} value={firstInputValue} onChange={changeFirstInputValue} />
            <input type={"range"} min={"0"} max={"100"} step={"1"} value={secondInputValue} onChange={changeSecondInputValue}/>
        </div>
    );
};

export default Main;