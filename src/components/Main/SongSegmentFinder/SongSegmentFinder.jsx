import React, {useEffect, useState} from 'react';
import getTime from "../time";
import RangeSlider from "../RangeSlider/RangeSlider";
import clientErrors from "../../../utils/clientErrors";
import serverErrors from "../../../utils/serverErrors";

const minDistinction = 5;
const maxDistinction = 20;

const SongSegmentFinder = ({firstInputValue, secondInputValue, setFirstInputValue,
                           setSecondInputValue, embeddedLink, videoDuration, findSong, localisation,
                           handledError, setErrorMessage}) => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    useEffect(() => {
        const difference = secondInputValue - firstInputValue
        if (!isButtonDisabled) {
            if (difference < minDistinction) {
                setIsButtonDisabled(true)
                setErrorMessage(serverErrors.INCORRECT_VIDEO_PARAMETERS_ERROR_BAD_DURATION)
            }
            else if (difference > maxDistinction) {
                setIsButtonDisabled(true)
                setErrorMessage(clientErrors.BAD_DURATION_DISTINCTION)
            }
        }
        else {
            if (difference >= minDistinction && difference <= maxDistinction) {
                setIsButtonDisabled(false)
                setErrorMessage("")
            }
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
                         videoDuration={videoDuration}/>
            {handledError && <div className={"main-container-error-message"}>{handledError}</div>}
            <button disabled={isButtonDisabled} onClick={findSong} has-error-message={(!!handledError).toString()}>
                {localisation.localisationEntries.FIND_SONG_BUTTON_TITTLE} </button>
        </div>
    );
};

export default SongSegmentFinder;
