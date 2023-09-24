import {TimerFormProps} from "../types.ts";
import React from "react";

const TimerForm: React.FC<TimerFormProps> = ({ onSubmit,  workTime,  setWorkTime,  pauseTime,  setPauseTime,  handlePauseTimer,  handleResetTimer, }) => {
    return (
        <form className={"time-form"} onSubmit={onSubmit}>
            <h2 className={"work-time-title"}>Working time</h2>
            <label className={"work-time"}>
                <input
                    value={workTime[0]}
                    className={"work-time-input"}
                    type={"number"}
                    onChange={(event) => {
                        setWorkTime(prevState =>  [event.target.value, prevState[1], prevState[2]]);
                    }}
                />
                <input
                    value={workTime[1]}
                    className={"work-time-input"}
                    type={"number"}
                    onChange={(event) => {
                        setWorkTime(prevState =>  [prevState[0], event.target.value, prevState[2]]);
                    }}
                />
                <input
                    value={workTime[2]}
                    className={"work-time-input"}
                    type={"number"}
                    onChange={(event) => {
                        setWorkTime(prevState =>  [prevState[0], prevState[1], event.target.value]);
                    }}
                />
            </label>
            <h2 className={"pause-time-title"}>Pause time</h2>
            <label className={"pause-time"}>
                <input
                    value={pauseTime[0]}
                    className={"pause-time-input"}
                    type={"number"}
                    onChange={(event) => {
                        setPauseTime(prevState =>  [event.target.value, prevState[1], prevState[2]]);
                    }}
                />
                <input
                    value={pauseTime[1]}
                    className={"pause-time-input"}
                    type={"number"}
                    onChange={(event) => {
                        setPauseTime(prevState =>  [prevState[0], event.target.value, prevState[2]]);
                    }}
                />
                <input
                    value={pauseTime[2]}
                    className={"pause-time-input"}
                    type={"number"}
                    onChange={(event) => {
                        setPauseTime(prevState =>  [prevState[0], prevState[1], event.target.value]);
                    }}
                />
            </label>
            <button className={"button-time-form"} type={"submit"}>Start</button>
            <button className={"button-time-form"} onClick={handlePauseTimer}> Stop</button>
            <button className={"button-time-form"} onClick={handleResetTimer}>Reset</button>
        </form>
    )
}

export default TimerForm;
