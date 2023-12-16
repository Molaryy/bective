import { useEffect, useState } from 'react';
import GetTodo from './GetTodo.tsx';
import ListTodosContainer from './ListTodosContainer.tsx';
import { ReceivedTodoApiType } from '../../types.ts';

const TodosHandler = () => {
  useEffect(() => {}, []);
  const [todos, setTodos] = useState<ReceivedTodoApiType>();
  const [todosLength, setTodosLength] = useState(0);

  useEffect(() => {}, [todosLength]);

  return (
    <>
      <GetTodo
        todosLength={todosLength}
        setTodosLength={setTodosLength}
        todos={todos}
        setTodos={setTodos}
      />
      <ListTodosContainer
        todos={todos}
        setTodos={setTodos}
        todosLength={todosLength}
        setTodosLength={setTodosLength}
      />
    </>
  );
};

export default TodosHandler;
