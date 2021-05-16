import React from 'react';
import "../main.css";

const RangeSlider = ({videoDuration, distinction, firstInputValue,
                         secondInputValue, setFirstInputValue, setSecondInputValue}) => {
    return (
        <div className={"range-slider"}>
            <input type={"range"} min={"0"} max={videoDuration} step={"1"} value={firstInputValue} data-testid={"first"}
                   onChange={ (e) =>
                   {changeFirstInputValue(e, secondInputValue, distinction, setFirstInputValue)}} />
            <input type={"range"} min={"0"} max={videoDuration} step={"1"} value={secondInputValue} data-testid={"second"}
                   onChange={ (e) =>
                   {changeSecondInputValue(e, firstInputValue, distinction, setSecondInputValue)}}/>
        </div>
    );
};

const changeFirstInputValue = (e, secondInputValue, distinction, setFirstInputValue) => {
    const value = parseInt(e.target.value);
    // second version
    if (value < secondInputValue) {
        setFirstInputValue(value);
    }

    // first version
    /*
    if (value < secondInputValue && ((secondInputValue - value) <= distinction)) {
        //console.log("yes ", value, " ", secondInputValue);
        setFirstInputValue(value);
        //e.preventDefault();
    }

     */

};

const changeSecondInputValue = (e, firstInputValue, distinction, setSecondInputValue) => {
    const value = parseInt(e.target.value);
    // second version
    if (value > firstInputValue)
    {
        setSecondInputValue(value);
    }
    //first version
    /*
    if (value > firstInputValue && (value - firstInputValue <= distinction))
    {
        //console.log("yes", firstInputValue, value);
        setSecondInputValue(value);
    }

     */

};

export default RangeSlider;
