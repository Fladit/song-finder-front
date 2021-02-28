import React from 'react';
import getTime from "../time";
import RangeSlider from "../RangeSlider/RangeSlider";

const SongSegmentFinder = ({firstInputValue, secondInputValue, setFirstInputValue,
                           setSecondInputValue, embeddedLink, videoDuration, distinction, findSong}) => {

    return (
        <div>
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
            <button onClick={findSong}> Найти песню </button>
        </div>
    );
};

export default SongSegmentFinder;
