import '../../styles/ListTodos.scss';
import { useEffect, useState } from 'react';
import { TodoList } from '../../types.ts';

const todoValues = {
  pixelGap: 15,
  littleSizeText: 50,
  bigSizeText: 75,
};

const ListTodosContainer = ({ todos }: { todos: TodoList[] }) => {
  const [heightBlurBg, setHeightBlurBg] = useState(0);

  useEffect(() => {
    if (todos.length <= 0) {
      setHeightBlurBg(0);
      return;
    }

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
  }, [heightBlurBg, todos]);

  // TODO
  // - Si on click sur Todo on peut cacher la vue des Todos
  // - Passer en parametres l'array Todos

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
