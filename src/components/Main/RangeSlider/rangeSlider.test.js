import React from "react";
import {fireEvent, screen, render} from "@testing-library/react";
import TestRangeSlider from "./TestRangeSlider";
import {act} from "react-dom/test-utils";

const distinction = 40;
const videoDuration = 60
const firstInputTestID = "first"
const secondInputTestID = "second"

describe("Range slider tests", () => {
    test("prohibit set value, when try to set first input value greater or equal to second input value", () => {
        const firstInputValue = 15;
        const secondInputValue = 40
        const newFirstInputValue = secondInputValue + 5;
        const newSecondInputValue = 35
        render(<TestRangeSlider distinction={distinction} videoDuration={videoDuration}
                                firstInputValueTest={firstInputValue} secondInputValueTest={secondInputValue}/>)

        // Проверяем, правильно ли установлено значение на первом элементе ввода
        expect(screen.getByTestId(firstInputTestID).value).toBe((firstInputValue).toString())
        act(() => {
            fireEvent.change(screen.getByTestId(firstInputTestID), {target: {value: newFirstInputValue}})
        })
        act(() => {
            fireEvent.change(screen.getByTestId(secondInputTestID), {target: {value: (newSecondInputValue).toString()}})
        })

        //Проверяем, установилось ли новое значение, большее значения второго элемента ввода, первому элементу вводу.
        // Не должно установиться, исходя из этого значение элемента ввода должно остаться изначальным.
        expect(screen.getByTestId(firstInputTestID).value).toBe((firstInputValue).toString())

        //Проверяем, установилось ли новое значение второму элементу вводу.
        // Должно установиться.
        expect(screen.getByTestId(secondInputTestID).value).toBe((newSecondInputValue).toString())
    })

    test("prohibit set value, when try to set second input value less than first input value", () => {
        const firstInputValue = 30;
        const secondInputValue = 50;
        const newFirstInputValue = firstInputValue + 5;
        const newSecondInputValue = firstInputValue - 5;
        render(<TestRangeSlider distinction={distinction} videoDuration={videoDuration}
                                firstInputValueTest={firstInputValue} secondInputValueTest={secondInputValue}/>)

        // Проверяем, правильно ли установлено значение на первом элементе ввода
        expect(screen.getByTestId(firstInputTestID).value).toBe((firstInputValue).toString())

        act(() => {
            fireEvent.change(screen.getByTestId(firstInputTestID), {target: {value: newFirstInputValue}})
        })
        act(() => {
            fireEvent.change(screen.getByTestId(secondInputTestID), {target: {value: (newSecondInputValue).toString()}})
        })

        //Проверяем, установилось ли новое значение, меньшее значения первого элемента ввода, второму элементу вводу.
        // Не должно установиться, исходя из этого значение элемента ввода должно остаться изначальным.
        expect(screen.getByTestId(secondInputTestID).value).toBe((secondInputValue).toString())

        //Проверяем, установилось ли новое значение первому элементу вводу.
        // Должно установиться.
        expect(screen.getByTestId(firstInputTestID).value).toBe((newFirstInputValue).toString())
    })
})
