import React, {useEffect, useState} from 'react';
import getTime from "../time";
import RangeSlider from "../RangeSlider/RangeSlider";
import clientErrors from "../../../utils/clientErrors";

const SongSegmentFinder = ({firstInputValue, secondInputValue, setFirstInputValue,
                           setSecondInputValue, embeddedLink, videoDuration, distinction, findSong, localisation,
                           handledError, setErrorMessage}) => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    useEffect(() => {
        if (!isButtonDisabled && (secondInputValue - firstInputValue > distinction)) {
            setIsButtonDisabled(true)
            setErrorMessage(clientErrors.BAD_DURATION_DISTINCTION)
        }
        else if (isButtonDisabled && (secondInputValue - firstInputValue <= distinction)) {
            setIsButtonDisabled(false)
            setErrorMessage("")
        }
    }, [firstInputValue, secondInputValue])
    return (
        <div>
            {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
            <iframe className={"main-youtube-player"} width="560" height="370" src={embeddedLink} frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen/>
            <div className={"main-container-text-fields"}>
                <div className={"main-container-text-fields-time"}>{getTime(firstInputValue)}</div>
                <div className={"main-container-text-fields-text"}>
                    {localisation.localisationEntries.CHOOSE_VIDEO_INTERVAL} </div>
                <div className={"main-container-text-fields-time"}>{getTime(secondInputValue)}</div>
            </div>
            <RangeSlider firstInputValue={firstInputValue} secondInputValue={secondInputValue}
                         setFirstInputValue={setFirstInputValue} setSecondInputValue={setSecondInputValue}
                         distinction={distinction} videoDuration={videoDuration}/>
            {handledError && <div className={"main-container-error-message"}>{handledError}</div>}
            <button disabled={isButtonDisabled} onClick={findSong} has-error-message={(!!handledError).toString()}>
                {localisation.localisationEntries.FIND_SONG_BUTTON_TITTLE} </button>
        </div>
    );
};

export default SongSegmentFinder;
