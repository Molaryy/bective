import React, { Dispatch, SetStateAction } from 'react';
import { TimerFormProps } from '../../types.ts';
import './Form.scss';

type InputTimeProps = {
  time: string;
  isWorking: boolean;
  indexOnChangeToAddValue: number;
  setWorkTime: Dispatch<SetStateAction<string[]>>;
  setPauseTime: Dispatch<SetStateAction<string[]>>;
};

function InputTime({
  time,
  isWorking,
  indexOnChangeToAddValue,
  setWorkTime,
  setPauseTime,
}: InputTimeProps) {
  return (
    <input
      value={time}
      className={isWorking ? 'work-time-input' : 'pause-time-input'}
      type='number'
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
  handleContinueTimer,
  isWorking,
  isInPause,
}) => {
  const workTitleCss = isWorking ? 'is-working-title' : '';
  const pauseTitleCss = isInPause ? 'is-in-pause-title' : 'black';
  const isWorkingBoxColor =
    isWorking || isInPause ? (isWorking ? '#ffaf00' : isInPause ? '#0fbcce' : '') : '';
  const boxShadow = isWorking || isInPause ? '0 5px 5px' : '0 0px 0px';

  return (
    <form
      className='time-form'
      onSubmit={onSubmit}
      style={{ color: isWorkingBoxColor, boxShadow: boxShadow }}
    >
      <div className={'timer'}>
        <div className={'working'}>
          <h2 className={`work-time-title ${workTitleCss}`}>Working</h2>
          <label className='work-time'>
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
        </div>
        <div className={'pause'}>
          <h2 className={`pause-time-title ${pauseTitleCss}`}>Pause</h2>
          <label className='pause-time'>
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
        </div>
      </div>

      <div className={'buttons-time-form'}>
        <button className='btn-form' type='submit'>
          Start
        </button>
        <button className='btn-form' type='button' onClick={handlePauseTimer}>
          Stop
        </button>
        <button className='btn-form' type='button' onClick={handleContinueTimer}>
          Continue
        </button>
        <button className='btn-form' type='button' onClick={handleResetTimer}>
          Reset
        </button>
      </div>
    </form>
  );
};

export default TimerForm;
