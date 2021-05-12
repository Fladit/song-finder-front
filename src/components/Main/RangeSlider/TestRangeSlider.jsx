import React, {useState} from 'react';
import RangeSlider from "./RangeSlider";

const TestRangeSlider = ({videoDuration, distinction, firstInputValueTest, secondInputValueTest}) => {
    const [firstInputValue, setFirstInputValue] = useState(firstInputValueTest)
    const [secondInputValue, setSecondInputValue] = useState(secondInputValueTest)
    return (
        <RangeSlider firstInputValue={firstInputValue} secondInputValue={secondInputValue}
                     setFirstInputValue={setFirstInputValue} setSecondInputValue={setSecondInputValue}
                     videoDuration={videoDuration} distinction={distinction}/>
    );
};

export default TestRangeSlider;
