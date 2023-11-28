import '../../styles/ListTodos.scss';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import axios from 'axios';
import { ReceivedTodoApiType } from '../../types.ts';

const GetTodoButton = () => {
  const [bgColorButton, setBgColorButton] = useState('rgb(239,94,94)');
  const [colorText, setColorText] = useState('rgb(.gitignore,.gitignore,.gitignore)');

  return (
    <button
      type={'submit'}
      className={'get-todos-container'}
      style={{ backgroundColor: bgColorButton, color: colorText }}
      onMouseOver={() => {
        setBgColorButton('rgb(49,45,45)');
        setColorText('rgb(239,94,94)');
      }}
      onMouseLeave={() => {
        setBgColorButton('rgb(239,94,94)');
        setColorText('rgb(49,45,45)');
      }}
    >
      <h3>Create todo</h3>
    </button>
  );
};

const GetTodo = (
  {
    todosLength,
    setTodosLength,
    todos,
    setTodos
  }: {
    todosLength: number;
    setTodosLength: Dispatch<SetStateAction<number>>;
    todos: ReceivedTodoApiType | undefined;
    setTodos: Dispatch<SetStateAction<ReceivedTodoApiType | undefined>>
  }
) => {
  const [inputValue, setInputValue] = useState('');

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (inputValue === '' || inputValue === undefined || !todos) {
      setInputValue('');
      return;
    }
    const newTodo = {
      'title': inputValue,
      'description': '',
      'startDate': '',
      'endDate': ''
    };
    const createdTodo = await axios.post('http://localhost:8080/todo', newTodo).then(res => res.data);
    setTodosLength(todosLength + 1);
    const updatedTodos = { ...todos };
    updatedTodos.todo = [...updatedTodos.todo, createdTodo.created];
    setTodos(updatedTodos);
    setInputValue('');
  };

  return (
    <form className={'todo-input-form'} onSubmit={onSubmit}>
      <input
        className={'input-todo'}
        maxLength={90}
        placeholder={"My new project"}
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
      />
      <input
        className={'input-todo'}
        maxLength={90}
        placeholder={"My new project"}
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
      />
      <GetTodoButton />
    </form>
  );
};

export default GetTodo;
