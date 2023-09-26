import { FormEvent, useEffect, useState } from 'react'
import TimerForm from './TimerForm.tsx'
import pauseSound from '/assets/pause-music.mp3'

function TimerFormHandler() {
  const [workTime, setWorkTime] = useState<string[]>(['00', '00', '00'])
  const [pauseTime, setPauseTime] = useState<string[]>(['00', '00', '00'])
  const [isWorkTimerRunning, setIsWorkTimerRunning] = useState(false)
  const [isPauseTimerRunning, setIsPauseTimerRunning] = useState(false)
  const [startPauseSound, setStartSongWork] = useState(false)
  const [storeWorkTime, setStoreWorkTime] = useState<string[] | null>(null)
  const [storePauseTime, setStorePauseTime] = useState<string[] | null>(null)

  const handleFormSubmit = (event: FormEvent): void => {
    event.preventDefault()
    setStoreWorkTime(workTime)
    setStorePauseTime(pauseTime)
    setIsWorkTimerRunning(true)
    setIsPauseTimerRunning(false)
  }

  const handlePauseTimer = (): void => {
    setIsWorkTimerRunning(false)
    setIsPauseTimerRunning(false)
    setStartSongWork(false)
  }

  const handleResetTimer = (): void => {
    setIsWorkTimerRunning(false)
    setWorkTime(['00', '00', '00'])
    setPauseTime(['00', '00', '00'])
  }

  const handleContinueTimer = (): void => {
    setIsWorkTimerRunning(workTime.toString() != storeWorkTime?.toString())
    setIsPauseTimerRunning(pauseTime.toString() != storePauseTime?.toString())
    !startPauseSound ? setStartSongWork(true) : setStartSongWork(false)
  }

  useEffect(() => {
    const hoursInSeconds: number = parseInt(isWorkTimerRunning ? workTime[0] : pauseTime[0]) * 3600
    const minutesInSeconds: number = parseInt(isWorkTimerRunning ? workTime[1] : pauseTime[1]) * 60
    const seconds: number = parseInt(isWorkTimerRunning ? workTime[2] : pauseTime[2])
    let totalSeconds: number = hoursInSeconds + minutesInSeconds + seconds

    if (!isWorkTimerRunning && !isPauseTimerRunning) {
      return
    }

    const timeInterval: number = setInterval(() => {
      if (totalSeconds <= 0) {
        clearInterval(timeInterval)
        setIsWorkTimerRunning(!isWorkTimerRunning)
        setStartSongWork(isWorkTimerRunning)
        setIsPauseTimerRunning(isWorkTimerRunning)
        if (storeWorkTime && storePauseTime) {
          setWorkTime(storeWorkTime)
          setPauseTime(storePauseTime)
        }
      } else {
        totalSeconds -= 1
        const hours: number = Math.floor(totalSeconds / 3600)
        const minutes: number = Math.floor((totalSeconds % 3600) / 60)
        const seconds: number = totalSeconds % 60
        const workedTime: string[] = [
          hours.toString().padStart(2, '0'),
          minutes.toString().padStart(2, '0'),
          seconds.toString().padStart(2, '0'),
        ]
        isWorkTimerRunning ? setWorkTime(workedTime) : setPauseTime(workedTime)
      }
    }, 1000)

    return () => clearInterval(timeInterval)
  }, [isPauseTimerRunning, isWorkTimerRunning, pauseTime, storePauseTime, storeWorkTime, workTime])

  return (
    <>
      <TimerForm
        onSubmit={handleFormSubmit}
        workTime={workTime}
        setWorkTime={setWorkTime}
        pauseTime={pauseTime}
        setPauseTime={setPauseTime}
        handlePauseTimer={handlePauseTimer}
        handleResetTimer={handleResetTimer}
        handleContinueTimer={handleContinueTimer}
        isWorking={isWorkTimerRunning}
        isInPause={isPauseTimerRunning}
      />
      {startPauseSound ? <audio controls src={pauseSound} autoPlay hidden /> : <></>}
    </>
  )
}
export default TimerFormHandler
