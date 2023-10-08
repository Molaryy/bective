import '../../styles/ListTodos.scss';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { TodoList } from '../../types.ts';

const placeHolderRandom = () => {
  const array = [
    'Memorize my notes',
    'Complete school project',
    'Read a book',
    'Exercise',
    'Learn a new skill',
  ];

  return array[Math.floor(Math.random() * array.length)];
};

const GetTodoButton = () => {
  const [bgColorButton, setBgColorButton] = useState('rgb(239,94,94)');
  const [colorText, setColorText] = useState('rgb(0,0,0)');

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
        setColorText('rgb(0,0,0)');
      }}
    >
      <h3>Create todo</h3>
    </button>
  );
};

const GetTodo = ({
  todos,
  setTodos,
}: {
  todos: TodoList[];
  setTodos: Dispatch<SetStateAction<TodoList[]>>;
}) => {
  const [inputValue, setInputValue] = useState('');

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (inputValue === '' || inputValue === undefined) {
      setInputValue('');
      return;
    }
    setTodos([...todos, { text: inputValue }]);
    setInputValue('');
  };

  return (
    <form className={'todo-input-form'} onSubmit={onSubmit}>
      <input
        className={'input-todo'}
        maxLength={90}
        placeholder={placeHolderRandom()}
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
