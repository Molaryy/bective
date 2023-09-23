import {FormEvent, useEffect, useState} from 'react'
import './App.css'
import pauseSound from "./assets/pause-music.mp3";
import TimerForm from "./components/TimerForm.tsx";
import {Simulate} from "react-dom/test-utils";
import pause = Simulate.pause;

function App() {
    const [workTime, setWorkTime] = useState<string[]>(["00", "00", "00"]);
    const [pauseTime, setPauseTime] = useState<string[]>(["00", "00", "00"]);
    const [isWorkTimerRunning, setIsWorkTimerRunning] = useState(false);
    const [isPauseTimerRunning, setIsPauseTimerRunning] = useState(false);
    const [startPauseSound, setStartSongWork] = useState(false);
    const [storeWorkTime, setStoreWorkTime] = useState<string[] | null>(null);
    const [storePauseTime, setStorePauseTime]  = useState<string[] | null>(null);

    const handleFormSubmit = (event: FormEvent) => {
        event.preventDefault();
        setStoreWorkTime(workTime)
        setStorePauseTime(pauseTime)
        setIsWorkTimerRunning(true);
    }

    useEffect(() => {
        let timeInterval: number | undefined;

        if (isWorkTimerRunning) {
            let totalSeconds = parseInt(isWorkTimerRunning ? workTime[0] : pauseTime[0]) * 3600 + parseInt(isWorkTimerRunning ? workTime[1] : pauseTime[1]) * 60 + parseInt(isWorkTimerRunning ? workTime[2] : pauseTime[2]);
            timeInterval = setInterval(() => {
                if (totalSeconds <= 0) {
                    clearInterval(timeInterval);
                    setIsWorkTimerRunning(!isWorkTimerRunning);
                    setStartSongWork(isWorkTimerRunning);
                    setIsPauseTimerRunning(isWorkTimerRunning);
                    if (storeWorkTime) {
                        setWorkTime(storeWorkTime);
                    }
                } else {
                    totalSeconds -= 1;
                    const hours = Math.floor(totalSeconds / 3600);
                    const minutes = Math.floor((totalSeconds % 3600) / 60);
                    const seconds = totalSeconds % 60;
                    const workedTime = [hours.toString().padStart(2, "0"), minutes.toString().padStart(2, "0"), seconds.toString().padStart(2, "0") ];
                    isWorkTimerRunning ? setWorkTime(workedTime) : setPauseTime(workedTime);
                }
                }, 1000);
        } }, [isPauseTimerRunning, isWorkTimerRunning, pauseTime, storePauseTime, storeWorkTime, workTime]);

    const handlePauseTimer = () => {
        setIsWorkTimerRunning(false);
        setStartSongWork(false);
    };

    const handleResetTimer = () => {
        setIsWorkTimerRunning(false);
        setWorkTime(["00", "00", "00"]);
    };

  return (
    <main>
        <TimerForm
            onSubmit={handleFormSubmit}
            workTime={workTime}
            setWorkTime={setWorkTime}
            pauseTime={pauseTime}
            setPauseTime={setPauseTime}
            handlePauseTimer={handlePauseTimer}
            handleResetTimer={handleResetTimer}
        />
        {startPauseSound ? (
            <audio controls src={pauseSound} autoPlay={true} hidden={true}></audio>
        ) : (
            <></>
        )}
    </main>
  )
}

export default App
