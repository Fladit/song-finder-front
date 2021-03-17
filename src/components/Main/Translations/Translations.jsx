import React from 'react';
import {localisationDictionary} from "../../../utils/localisation";
const enumLanguages = {
    [localisationDictionary.EN]: "English",
    [localisationDictionary.RU]: "Русский"
}

const Translations = ({localisation}) => {
    return (
        <div className={"translation"}>
            <div className={"translation-title"}>{localisation.localisationEntries.TRANSLATIONS}:</div>
            <ul className={"translation-list"}>
                {Object.entries(enumLanguages).map(([key, value]) =>
                    <li key={value} className={"translation-list-element"} onClick={() => {
                        if (localisation.language !== value)
                            localisation.setLanguage(key)
                    }}>
                        {value}
                    </li>)}
            </ul>
        </div>
    );
};

export default React.memo(Translations, ((prevProps, nextProps) => {
    return prevProps.localisation.localisationEntries === nextProps.localisation.localisationEntries
}));
