import {useEffect, useMemo, useState} from "react";
import {getLocalisation, setLocalisation, localisationDictionary} from "../utils/localisation";

const useOwnLocalisation = () => {
    const [language, setLanguage] = useState(localisationDictionary.EN)

    const localisationEntries = useMemo(() => {
        setLocalisation(language)
        return getLocalisation()
    }, [language])

    return {language, setLanguage, localisationEntries}
}

export default useOwnLocalisation
