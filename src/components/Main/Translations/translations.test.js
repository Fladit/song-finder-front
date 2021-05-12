import React from "react";
import {unmountComponentAtNode} from "react-dom";
import {fireEvent, screen, render} from "@testing-library/react"
import {act} from "react-dom/test-utils";
import Translations from "./Translations";
import {enLocalisation, getLocalisation, ruLocalisation, setLocalisation} from "../../../utils/localisation";
import localisationDictionary from "../../../utils/localisationDictionary";
import TestTranslations from "./TestTranslations";

/*
function testCurrentLocalisation(localisation, container) {
    // Используем act асинхронно, чтобы передать успешно завершённые промисы
    act(() => {
        render(<Translations localisation={localisation}/>, container);
    });
    expect(container.querySelector("#translation-title").textContent)
        .toBe(`${localisation.localisationEntries.TRANSLATIONS}:`)
}

 */
/*
let container = null;
beforeEach(() => {
    // подготавливаем DOM-элемент, куда будем рендерить
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // подчищаем после завершения
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

 */

describe("render translation window", () => {

    test("english translation", async () => {
        render(<TestTranslations/>)
        expect(screen.getByText(`${enLocalisation.TRANSLATIONS}:`).textContent).toBe(`${enLocalisation.TRANSLATIONS}:`)
    })

    test("switch english translation to russian", () => {
        render(<TestTranslations/>)
        expect(screen.getByText(`${enLocalisation.TRANSLATIONS}:`)).toBeDefined()
        act(() => {
            fireEvent.mouseOver(screen.getByText(`${enLocalisation.TRANSLATIONS}:`))
        })
        act(() => {
            fireEvent.click(screen.getByText("Русский"))
        })
        expect(screen.getByText(`${ruLocalisation.TRANSLATIONS}:`)).toBeDefined()
    })
});
