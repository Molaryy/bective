import '../../styles/ListTodos.scss';
import { useState } from 'react';

const ListTodosContainer = () => {
  const [heightBlurBg, setHeightBlurBg] = useState(500);
  const [settingStyleIsDone, setSettingStyleIsDone] = useState(true);
  const todos = [
    {
      text: 'Faire la vaisselle gr grg jkorhuipg erhigj',
    },
    {
      text: 'Faire la vaisselle gr grg jkorhuipg erhigj',
    },
    {
      text: 'Faire la vaisselle gr grg jkorhuipg erhigj',
    },
    {
      text: 'Faire la vaisselle gr grg jkorhuipg erhigj',
    },
    {
      text: 'Faire la vaisselle gr grg jkorhuipg erhigj',
    },
    {
      text: 'Faire la vaisselle gr grg jkorhuipg erhigj',
    },
    {
      text: 'Faire la vaisselle gr grg jkorhuipg erhigj',
    },
  ];

  const expandBlurBg = () => {
    if (!settingStyleIsDone) return;
    let heightCounter = 500;

    todos.forEach((todo) => {
      todo.text.length <= 50 ? (heightCounter += 80 - 15) : (heightCounter += 105);
    });
    setHeightBlurBg(heightCounter);
    setSettingStyleIsDone(false);
  };
  expandBlurBg();

  console.log(heightBlurBg);
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
                style={{ overflow: 'hidden', height: todo.text.length > 50 ? '75px' : '50px' }}
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
