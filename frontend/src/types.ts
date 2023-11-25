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

type TodoType = {
  id: number,
  title: string,
  description: string,
  startDate: string,
  endDate: string
};

type ReceivedTodoApiType = {
  todo: TodoType[]
}

export type { TimerFormProps, TodoType, ReceivedTodoApiType };
