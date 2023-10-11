import { Dispatch, FormEvent, SetStateAction } from 'react';

type TimerFormProps = {
  onSubmit: (event: FormEvent) => void;
  workTime: string[];
  setWorkTime: Dispatch<SetStateAction<string[]>>;
  pauseTime: string[];
  setPauseTime: Dispatch<SetStateAction<string[]>>;
  handlePauseTimer: () => void;
  handleResetTimer: () => void;
  handleContinueTimer: () => void;
  isWorking: boolean;
  isInPause: boolean;
};

type TodoList = {
  text: string;
};

export type { TimerFormProps, TodoList };
