import {FormEvent, useEffect, useState} from 'react'
import './App.css'
import pauseSound from "./assets/pause-music.mp3";

function App() {
    const [workTimeHours, setWorkTimeHours] = useState("00");
    const [workTimeMinutes, setWorkTimeMinutes] = useState("00");
    const [workTimeSeconds, setWorkTimeSeconds] = useState("00");
    const [pauseTimeHours, setPauseTimeHours] = useState("00");
    const [pauseTimeMinutes, setPauseTimeMinutes] = useState("00");
    const [pauseTimeSeconds, setPauseTimeSeconds] = useState("00");
    const [isWorkTimerRunning, setIsWorkTimerRunning] = useState(false);
    const [isPauseTimerRunning, setIsPauseTimerRunning] = useState(false);
    const [startPauseSound, setStartSongWork] = useState(false);
    const [storeWorkTime, setStoreWorkTime] = useState<string[] | null>(null);
    const [storePauseTime, setStorePauseTime]  = useState<string[] | null>(null);

    const handleFormSubmit = (event: FormEvent) => {
        event.preventDefault();
        const storeWork = [workTimeHours, workTimeMinutes, workTimeSeconds];
        const storePause = [pauseTimeHours, pauseTimeMinutes, pauseTimeSeconds];
        setStoreWorkTime(storeWork)
        setStorePauseTime(storePause)
        setIsWorkTimerRunning(true);
    }

    useEffect(() => {
        let timeInterval: number | undefined;
        if (isWorkTimerRunning) {
            let totalSecondsWork = parseInt(workTimeHours) * 3600 + parseInt(workTimeMinutes) * 60 + parseInt(workTimeSeconds);
            timeInterval = setInterval(() => {
                if (totalSecondsWork < 0) {
                    clearInterval(timeInterval);
                    setIsWorkTimerRunning(false);
                    setStartSongWork(true);
                    setIsPauseTimerRunning(true);
                    if (storeWorkTime) {
                        setWorkTimeHours(storeWorkTime[0]);
                        setWorkTimeMinutes(storeWorkTime[1]);
                        setWorkTimeSeconds(storeWorkTime[2]);
                    }
                    console.log(storeWorkTime)
                } else {
                    const hours = Math.floor(totalSecondsWork / 3600);
                    const minutes = Math.floor((totalSecondsWork % 3600) / 60);
                    const seconds = totalSecondsWork % 60;
                    setWorkTimeHours(hours.toString().padStart(2, "0"));
                    setWorkTimeMinutes(minutes.toString().padStart(2, "0"));
                    setWorkTimeSeconds(seconds.toString().padStart(2, "0"));
                    totalSecondsWork -= 1;
                }
                }, 1000);
        } else if (isPauseTimerRunning) {
            let totalSecondsPause = parseInt(pauseTimeHours) * 3600 + parseInt(pauseTimeMinutes) * 60 + parseInt(pauseTimeSeconds);
            timeInterval = setInterval(() => {
                if (totalSecondsPause < 0) {
                    clearInterval(timeInterval);
                    setIsWorkTimerRunning(true);
                    setStartSongWork(false);
                    console.log(storePauseTime)
                    setIsPauseTimerRunning(false);
                    if (storePauseTime) {
                        setPauseTimeHours(storePauseTime[0]);
                        setPauseTimeMinutes(storePauseTime[1]);
                        setPauseTimeSeconds(storePauseTime[2]);
                    }
                } else {
                    const hours = Math.floor(totalSecondsPause / 3600);
                    const minutes = Math.floor((totalSecondsPause % 3600) / 60);
                    const seconds = totalSecondsPause % 60;
                    setPauseTimeHours(hours.toString().padStart(2, "0"));
                    setPauseTimeMinutes(minutes.toString().padStart(2, "0"));
                    setPauseTimeSeconds(seconds.toString().padStart(2, "0"));
                    totalSecondsPause -= 1;
                }
            }, 1000);
        } else {
            clearInterval(timeInterval);
        }
        return () => {
            clearInterval(timeInterval);
        }
        }, [isPauseTimerRunning, isWorkTimerRunning, pauseTimeHours, pauseTimeMinutes, pauseTimeSeconds, storePauseTime, storeWorkTime, workTimeHours, workTimeMinutes, workTimeSeconds]);

  const handlePauseTimer = () => {
    setIsWorkTimerRunning(false);
    setStartSongWork(false);
  };

  const handleResetTimer = () => {
    setIsWorkTimerRunning(false);
    setWorkTimeHours("00");
    setWorkTimeMinutes("00");
    setWorkTimeSeconds("00");
  };

  return (
    <main>
            <form className={"time-form"} onSubmit={handleFormSubmit}>
                <h2 className={"work-time-title"}>Working time</h2>
                <label className={"work-time"}>
                    <input
                      value={workTimeHours}
                      className={"work-time-input"}
                      type={"number"}
                      onChange={(event) => {
                          setWorkTimeHours(event.target.value);
                      }}
                    />
                    <input
                        value={workTimeMinutes}
                        className={"work-time-input"}
                        type={"number"}
                        onChange={(event) => {
                            setWorkTimeMinutes(event.target.value);
                        }}
                    />
                    <input
                        value={workTimeSeconds}
                        className={"work-time-input"}
                        type={"number"}
                        onChange={(event) => {
                            setWorkTimeSeconds(event.target.value);
                        }}
                    />
                </label>
                <h2 className={"pause-time-title"}>Pause time</h2>
                <label className={"pause-time"}>
                    <input
                      value={pauseTimeHours}
                      className={"pause-time-input"}
                      type={"number"}
                      onChange={(event) => {
                          setPauseTimeHours(event.target.value);
                      }}
                    />
                    <input
                        value={pauseTimeMinutes}
                        className={"pause-time-input"}
                        type={"number"}
                        onChange={(event) => {
                            setPauseTimeMinutes(event.target.value);
                        }}
                    />
                    <input
                        value={pauseTimeSeconds}
                        className={"pause-time-input"}
                        type={"number"}
                        onChange={(event) => {
                            setPauseTimeSeconds(event.target.value);
                        }}
                    />
                </label>
                <button className={"button-time-form"} type={"submit"}>Start</button>
                <button className={"button-time-form"} onClick={handlePauseTimer}> Stop</button>
                <button className={"button-time-form"} onClick={handleResetTimer}>Reset</button>
            </form>
              {startPauseSound ? (
                  <audio controls src={pauseSound} autoPlay={true} hidden={true}></audio>
              ) : (
                  <></>
              )}

    </main>
  )
}

export default App
