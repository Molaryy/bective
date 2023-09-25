import React, { Dispatch, SetStateAction } from 'react';
import { TimerFormProps } from '../../types.ts';

function InputTime({
										 time, isWorking, indexOnChangeToAddValue, setWorkTime, setPauseTime,
									 }:
										 {
											 time: string,
											 isWorking: boolean,
											 indexOnChangeToAddValue: number,
											 setWorkTime: Dispatch<SetStateAction<string[]>>,
											 setPauseTime: Dispatch<SetStateAction<string[]>>
										 }) {
  return (
    <input
      value={time}
      className={isWorking ? 'work-time-input' : 'pause-time-input'}
      type="number"
      onChange={(event) => {
			  const { value } = event.target;
			  if (isWorking) {
			    setWorkTime((prevState) => [
			      indexOnChangeToAddValue === 0 ? value : prevState[0],
			      indexOnChangeToAddValue === 1 ? value : prevState[1],
			      indexOnChangeToAddValue === 2 ? value : prevState[2],
			    ]);
			  } else {
			    setPauseTime((prevState) => [
			      indexOnChangeToAddValue === 0 ? value : prevState[0],
			      indexOnChangeToAddValue === 1 ? value : prevState[1],
			      indexOnChangeToAddValue === 2 ? value : prevState[2],
			    ]);
			  }
      }}
      max={indexOnChangeToAddValue === 0 ? 24 : 60}
      min={0}
    />
  );
}

const TimerForm: React.FC<TimerFormProps> = ({
																							 onSubmit,
																							 workTime,
																							 setWorkTime,
																							 pauseTime,
																							 setPauseTime,
																							 handlePauseTimer,
																							 handleResetTimer,
																						 }) => (
  <form className="time-form" onSubmit={onSubmit}>
    <h2 className="work-time-title">Working time</h2>
    <label className="work-time">
      <InputTime
        time={workTime[0]}
        isWorking
        indexOnChangeToAddValue={0}
        setWorkTime={setWorkTime}
        setPauseTime={setPauseTime}
      />
      <InputTime
        time={workTime[1]}
        isWorking
        indexOnChangeToAddValue={1}
        setWorkTime={setWorkTime}
        setPauseTime={setPauseTime}
      />
      <InputTime
        time={workTime[2]}
        isWorking
        indexOnChangeToAddValue={2}
        setWorkTime={setWorkTime}
        setPauseTime={setPauseTime}
      />
    </label>
    <h2 className="pause-time-title">Pause time</h2>
    <label className="pause-time">
      <InputTime
        time={pauseTime[0]}
        isWorking={false}
        indexOnChangeToAddValue={0}
        setWorkTime={setWorkTime}
        setPauseTime={setPauseTime}
      />
      <InputTime
        time={pauseTime[1]}
        isWorking={false}
        indexOnChangeToAddValue={1}
        setWorkTime={setWorkTime}
        setPauseTime={setPauseTime}
      />
      <InputTime
        time={pauseTime[2]}
        isWorking={false}
        indexOnChangeToAddValue={2}
        setWorkTime={setWorkTime}
        setPauseTime={setPauseTime}
      />
    </label>
    <button className="button-time-form" type="submit">Start</button>
    <button className="button-time-form" type="button" onClick={handlePauseTimer}> Stop</button>
    <button className="button-time-form" type="button" onClick={handleResetTimer}>Reset</button>
  </form>
);

export default TimerForm;