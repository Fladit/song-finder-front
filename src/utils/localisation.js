const ruLocalistion = {

}

const enLocalisation = {

}

let currentLocalisation = {localisation: ruLocalistion}

function setLocalisation(localisation) {
    switch (localisation) {
        case "ru": {
            currentLocalisation = ruLocalistion
            break;
        }
        case "en": {
            currentLocalisation = enLocalisation
            break;
        }
        default: {
            break;
        }
    }
}

function translate(entry) {

}

export default currentLocalisation
