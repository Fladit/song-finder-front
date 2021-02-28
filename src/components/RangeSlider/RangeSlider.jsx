import React from 'react';
import "../Main/main.css"

const RangeSlider = ({videoDuration, distinction, firstInputValue,
                         secondInputValue, setFirstInputValue, setSecondInputValue}) => {
    return (
        <div className={"range-slider"}>
            <input type={"range"} min={"0"} max={videoDuration} step={"1"} value={firstInputValue}
                   onChange={ (e) =>
                   {changeFirstInputValue(e, secondInputValue, distinction, setFirstInputValue)}} />
            <input type={"range"} min={"0"} max={videoDuration} step={"1"} value={secondInputValue}
                   onChange={ (e) =>
                   {changeSecondInputValue(e, firstInputValue, distinction, setSecondInputValue)}}/>
        </div>
    );
};

const changeFirstInputValue = (e, secondInputValue, distinction, setFirstInputValue) => {
    const value = parseInt(e.target.value);
    if (value < secondInputValue && ((secondInputValue - value) <= distinction)) {
        //console.log("yes ", value, " ", secondInputValue);
        setFirstInputValue(value);
        //e.preventDefault();
    }
};

const changeSecondInputValue = (e, firstInputValue, distinction, setSecondInputValue) => {
    const value = parseInt(e.target.value);
    //console.log(typeof e.target.value, typeof secondInputValue, "70" > 100,  70 > 100, "70" > "100")
    if (value > firstInputValue && (value - firstInputValue <= distinction))
    {
        //console.log("yes", firstInputValue, value);
        setSecondInputValue(value);
    }

};

export default RangeSlider;
