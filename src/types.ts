import {Dispatch, FormEvent, SetStateAction} from "react";

export type TimerFormProps = {
    onSubmit: (event: FormEvent) => void;
    workTime: string[];
    setWorkTime: Dispatch<SetStateAction<string[]>>;
    pauseTime: string[];
    setPauseTime: Dispatch<SetStateAction<string[]>>;
    handlePauseTimer: () => void;
    handleResetTimer: () => void;
};

