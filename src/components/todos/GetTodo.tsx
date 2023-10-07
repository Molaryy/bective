import '../../styles/ListTodos.scss';
import { useState } from 'react';

const GetTodoButton = () => {
  const [bgColorButton, setBgColorButton] = useState('rgb(239,94,94)');
  const [colorText, setColorText] = useState('rgb(0,0,0)');

  return (
    <div
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
      <h2>Add todo</h2>
    </div>
  );
};

const GetTodo = () => {
  return (
    <>
      <textarea className={'input-todo'} maxLength={90} placeholder={'Memorize my notes'} />
      <GetTodoButton />
    </>
  );
};

export default GetTodo;
