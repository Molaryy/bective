import '../../styles/ListTodos.scss';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { TodoList } from '../../types.ts';

const todoValues = {
  pixelGap: 15,
  littleSizeText: 50,
  bigSizeText: 75,
};

const TodosListHeader = ({
  setHideList,
  hideList,
}: {
  setHideList: Dispatch<SetStateAction<boolean>>;
  hideList: boolean;
}) => {
  const [bgColor, setBgColor] = useState('rgb(72,72,65)');

  return (
    <div
      className={'todos-title-header'}
      style={{ backgroundColor: bgColor }}
      onMouseOver={() => setBgColor('rgb(133, 122, 122)')}
      onMouseLeave={() => setBgColor('rgb(72,72,65)')}
      onClick={() => setHideList(!hideList)}
    >
      <h2>Todos</h2>
    </div>
  );
};

const ListTodosContainer = ({ todos }: { todos: TodoList[] }) => {
  const [heightBlurBg, setHeightBlurBg] = useState<number>(0);
  const [hideList, setHideList] = useState<boolean>(false);
  const [settingsOpened, setSettingsOpened] = useState<boolean[]>([]);

  const initSettings = () => {
    const initValues: boolean[] = [];
    for (let i = 0; i < todos.length; i++) {
      if (!settingsOpened[i]) {
        initValues[i] = false;
      }
      setSettingsOpened(initValues);
    }
  };

  if (todos.length != settingsOpened.length) {
    initSettings();
  }

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

  const openTodoSettings = (key: number) => {
    settingsOpened[key] = !settingsOpened[key];
  };

  return (
    <div>
      <TodosListHeader setHideList={setHideList} hideList={hideList} />
      <div className={'todos-list-container'}>
        <div
          className={'todos-list'}
          style={{ height: heightBlurBg + 'px', display: hideList ? 'none' : '' }}
        ></div>
        <div className={'todos-list-text'}>
          {todos.map((todo, index) => {
            console.log(settingsOpened);
            return settingsOpened[index] ? (
              <div
                key={index}
                className={'todo-text-element'}
                style={{
                  overflow: 'hidden',
                  height: todo.text.length >= 50 ? '75px' : '150px',
                  display: hideList ? 'none' : '',
                }}
                onClick={() => openTodoSettings(index)}
              >
                <p>{todo.text}</p>
              </div>
            ) : (
              <div
                key={index}
                className={'todo-text-element'}
                style={{
                  overflow: 'hidden',
                  height: todo.text.length >= 50 ? '75px' : '50px',
                  display: hideList ? 'none' : '',
                }}
                onClick={() => openTodoSettings(index)}
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
