import React from "react";
import {fireEvent, screen, render, waitForElement} from "@testing-library/react"
import {act} from "react-dom/test-utils";
import Main from "./Main";
import {enLocalisation} from "../../utils/localisation";
import axios from "axios";

const secondInputTestID = "second"
jest.mock("axios")

describe("Testing the Main Component", () => {
    const localisation = enLocalisation
    test("song recognition from existing youtube video", async () => {
        const {container} = render(<Main/>)
        const youtubeVideoLink = "https://www.youtube.com/watch?v=FIbNPViilOU&ab_channel=HAUNTEDFAMILYHA"
        const songTitle = "Dezhavyu"
        const videoLinkInput = screen.getByPlaceholderText(localisation.INSERT_VIDEO_LINK_PLACEHOLDER)
        act(() => {
            fireEvent.change(videoLinkInput, {target: {value: youtubeVideoLink}})
        })
        expect(videoLinkInput.value).toBe(youtubeVideoLink)
        const videoInfo = {"videoID":"FIbNPViilOU","duration":173}
        const videoResp = {data: videoInfo}
        axios.post.mockResolvedValue(videoResp)
        act(() => {
            fireEvent.click(screen.getByText(localisation.FIND_VIDEO_BUTTON_TITLE))
        })

        await waitForElement(() => screen.getByText(localisation.FIND_SONG_BUTTON_TITTLE))

        expect(container.getElementsByClassName("main-youtube-player")[0].src)
            .toBe("https://www.youtube.com/embed/FIbNPViilOU")

        const newSecondInputValue = 10
        act(() => {
            fireEvent.change(screen.getByTestId(secondInputTestID), {target: {value: (newSecondInputValue)}})
        })
        expect(screen.getByTestId(secondInputTestID).value).toBe((newSecondInputValue).toString())

        const songInfo = {
            status: 'success',
            result: {
                artist: 'kizaru',
                title: 'Dezhavyu',
                album: 'Karmageddon',
                release_date: '2019-08-15',
                label: 'SME - Sony Music Entertainment',
                timecode: '00:09',
                song_link: 'https://lis.tn/Dezhavyu'
            }
        }
        const songResp = {data: songInfo}
        axios.post.mockResolvedValue(songResp)

        act(() => {
            fireEvent.click(screen.getByText(localisation.FIND_SONG_BUTTON_TITTLE))
        })
        await waitForElement(() => container.getElementsByClassName("main-song-page")[0])
        expect(container.getElementsByClassName("main-song-page")[0].src).toBe(songInfo.result.song_link)
    })


})
