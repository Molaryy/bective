import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from 'axios';
import { ReceivedTodoApiType, TodoType } from '../../types.ts';

const TodoUnity = (
  {
    settingsOpened,
    index,
    todo,
    hideList,
    openTodoSettings,
    todos,
    setTodos,
    setTodosLength,
    todosLength
  }:{
    settingsOpened: boolean[];
    index: number;
    todo: TodoType;
    hideList: boolean;
    openTodoSettings: (index: number) => void;
    todos: ReceivedTodoApiType;
    setTodos: Dispatch<SetStateAction<ReceivedTodoApiType | undefined>>
    setTodosLength: Dispatch<SetStateAction<number>>
    todosLength: number
  }) => {
  const [deleteButtonIsClicked, setDeleteButtonIsClicked] = useState(false);
  const [todoTimeBar, setTodoTimeBar] = useState(0);

  const removeTodo = async () => {
    await axios.delete(`http://localhost:8080/todo/${todo.id}`);
    setTodosLength(todosLength - 1)
    todos.todo.forEach((t: TodoType) => {
      console.log(t.id);
    })
    todos.todo = todos.todo.filter((t: TodoType) => t.id !== todo.id);
    setTodos(todos);
  }

  useEffect(() => {
    const timeInterval: number = setInterval(() => {
      todoTimeBar >= 100 ? setTodoTimeBar(0) : setTodoTimeBar(todoTimeBar + 1);
    }, 200);

    return () => clearInterval(timeInterval);
  }, [todoTimeBar]);

  return (
    <div
      className={'todo-text-element'}
      style={{
        overflow: 'hidden',
        height: todo.title.length >= 50 ? '75px' : settingsOpened[index] ? '150px' : '50px',
        display: hideList ? 'none' : '',
      }}
      onClick={() => {
        if (!deleteButtonIsClicked) {
          openTodoSettings(index)
        }
      }}
    >
      <div
        className={'todo-delete-button'}
        onMouseOver={() => setDeleteButtonIsClicked(true)}
        onClick={removeTodo}
        onMouseLeave={() => setDeleteButtonIsClicked(false)}>x</div>
      <div
        className={"todo-progress-bar"}
        style={{
          overflow: 'hidden',
          height: todo.title.length >= 50 ? '75px' : settingsOpened[index] ? '150px' : '50px',
          width: `${todoTimeBar}%`
        }}
      ></div>
      <p>{todo.title}</p>
    </div>
  )
};

export default TodoUnity;
