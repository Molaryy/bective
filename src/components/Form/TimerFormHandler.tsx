import { FormEvent, useEffect, useState } from 'react';
import TimerForm from './TimerForm.tsx';
import pauseSound from '/assets/5-minutes-lofi.mp3';
import workSound from '/assets/Wakey-Wakey.mp3';
import BreakTime from '../BreakTime.tsx';

const TimerFormHandler = () => {
  const [workTime, setWorkTime] = useState<string[]>(['00', '00', '05']);
  const [pauseTime, setPauseTime] = useState<string[]>(['00', '00', '05']);
  const [isWorkTimerRunning, setIsWorkTimerRunning] = useState(false);
  const [isPauseTimerRunning, setIsPauseTimerRunning] = useState(false);
  const [startPauseSound, setStartPauseSound] = useState(false);
  const [startWorkSound, setStartWorkSound] = useState<boolean[]>([false, false]);
  const [storeWorkTime, setStoreWorkTime] = useState<string[] | null>(null);
  const [storePauseTime, setStorePauseTime] = useState<string[] | null>(null);
  const [alertNotification, setAlertNotification] = useState(false);

  const handleFormSubmit = (event: FormEvent): void => {
    event.preventDefault();
    setStoreWorkTime(workTime);
    setStorePauseTime(pauseTime);
    setIsWorkTimerRunning(true);
    setIsPauseTimerRunning(false);
  };

  const handlePauseTimer = (): void => {
    setIsWorkTimerRunning(false);
    setIsPauseTimerRunning(false);
    setStartPauseSound(false);
    setStartWorkSound([false, false]);
  };

  const handleResetTimer = (): void => {
    console.log('3');
    setIsWorkTimerRunning(false);
    setWorkTime(['00', '25', '00']);
    setPauseTime(['00', '05', '00']);
  };

  const handleContinueTimer = (): void => {
    setIsWorkTimerRunning(workTime.toString() != storeWorkTime?.toString());
    setStartWorkSound([false, workTime.toString() != storeWorkTime?.toString()]);
    setIsPauseTimerRunning(pauseTime.toString() != storePauseTime?.toString());
    setStartPauseSound(pauseTime.toString() != storePauseTime?.toString());
  };

  useEffect(() => {
    const hoursInSeconds: number = parseInt(isWorkTimerRunning ? workTime[0] : pauseTime[0]) * 3600;
    const minutesInSeconds: number = parseInt(isWorkTimerRunning ? workTime[1] : pauseTime[1]) * 60;
    const seconds: number = parseInt(isWorkTimerRunning ? workTime[2] : pauseTime[2]);
    let totalSeconds: number = hoursInSeconds + minutesInSeconds + seconds;

    if (!isWorkTimerRunning && !isPauseTimerRunning) {
      return;
    }
    console.log('use effect = ', startPauseSound, '\n\n');

    if (alertNotification) {
      setAlertNotification(false);
    }

    if (isPauseTimerRunning && !alertNotification) {
      setAlertNotification(true);
    }

    const timeInterval: number = setInterval(() => {
      if (isPauseTimerRunning) {
        setStartWorkSound([true, false]);
      }

      if (startWorkSound[0] && isWorkTimerRunning) {
        setStartWorkSound([true, true]);
      }

      if (totalSeconds <= 0) {
        clearInterval(timeInterval);
        setIsWorkTimerRunning(!isWorkTimerRunning);
        setStartPauseSound(isWorkTimerRunning);
        setIsPauseTimerRunning(isWorkTimerRunning);

        if (storeWorkTime && storePauseTime) {
          setWorkTime(storeWorkTime);
          setPauseTime(storePauseTime);
        }
      } else {
        totalSeconds -= 1;
        const hours: number = Math.floor(totalSeconds / 3600);
        const minutes: number = Math.floor((totalSeconds % 3600) / 60);
        const seconds: number = totalSeconds % 60;
        const workedTime: string[] = [
          hours.toString().padStart(2, '0'),
          minutes.toString().padStart(2, '0'),
          seconds.toString().padStart(2, '0'),
        ];
        isWorkTimerRunning ? setWorkTime(workedTime) : setPauseTime(workedTime);
      }
    }, 1000);

    return () => clearInterval(timeInterval);
  }, [isPauseTimerRunning, isWorkTimerRunning, pauseTime, storePauseTime, storeWorkTime, workTime]);

  console.log('final result = ', startPauseSound, '\n\n');
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
      {startPauseSound ? (
        <>
          <BreakTime />
          <audio controls src={pauseSound} autoPlay hidden />
        </>
      ) : (
        <></>
      )}
      {startWorkSound[0] && startWorkSound[1] ? (
        <audio controls src={workSound} autoPlay hidden />
      ) : (
        <></>
      )}
    </>
  );
};
export default TimerFormHandler;
