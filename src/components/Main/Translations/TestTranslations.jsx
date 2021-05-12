import React from 'react';
import useOwnLocalisation from "../../../hooks/useOwnLocalisation";
import Translations from "./Translations";

const TestTranslations = () => {
    const localisation = useOwnLocalisation()
    return (
        <Translations localisation={localisation}/>
    );
};

export default TestTranslations;
