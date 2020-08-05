const getTime = (time) => {
    const seconds = time % 60;
    let remainingTime = time - seconds;
    const minutes = (remainingTime % 3600) / 60;
    const totalTime = minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
    //console.log("min:", minutes, "sec:", seconds, "test:", remainingTime, "a:", (remainingTime % 3600), "time:", time)
    return totalTime;
}
export default getTime;