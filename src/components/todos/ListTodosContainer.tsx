import '../../styles/ListTodos.scss';
import { useEffect, useState } from 'react';

const todoValues = {
  pixelGap: 15,
  littleSizeText: 50,
  bigSizeText: 75,
};

const ListTodosContainer = () => {
  const [heightBlurBg, setHeightBlurBg] = useState(0);
  const todos = [
    {
      text: 'Faire la v f',
    },
    {
      text: 'Faire la v f',
    },
    {
      text: 'Faire la v f',
    },
    {
      text: 'FairefewlavfFairefewla v fFaire few la v fFaire few la v fFaire few la v fFaire few la v fFaire few la v  e gergf',
    },
    {
      text: 'FairefewlavfFairefewla v fFaire few la v fFaire few la v fFaire few la v fFaire few la v fFaire few la v  e gergf',
    },
  ];

  useEffect(() => {
    const expandBlurBg = () => {
      let heightCounter = todoValues.pixelGap;

      todos.forEach((todo) => {
        todo.text.length >= todoValues.littleSizeText
          ? (heightCounter += todoValues.bigSizeText)
          : (heightCounter += todoValues.littleSizeText);
        heightCounter += todoValues.pixelGap;
        setHeightBlurBg(heightCounter);
      });
    };
    expandBlurBg();
  }, [heightBlurBg]);

  return (
    <div>
      <div className={'todos-title-div'}>
        <h2>Todos</h2>
      </div>
      <div className={'todos-list-container'}>
        <div className={'todos-list'} style={{ height: heightBlurBg + 'px' }}></div>
        <div className={'todos-list-text'}>
          {todos.map((todo, index) => {
            return (
              <div
                key={index}
                className={'todo-text-element'}
                style={{ overflow: 'hidden', height: todo.text.length >= 50 ? '75px' : '50px' }}
              >
                <p>{todo.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ListTodosContainer;
