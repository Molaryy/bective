import {FormEvent} from "react";

export type TimerFormProps = {
    onSubmit: (event: FormEvent) => void;
    workTime: string[];
    setWorkTime: (newWorkTime: (prevState: never) => (string | never)[]) => void;
    pauseTime: string[];
    setPauseTime: (newPauseTime: (prevState: never) => (string | never)[]) => void;
    handlePauseTimer: () => void;
    handleResetTimer: () => void;
};

