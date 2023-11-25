import '../../styles/ListTodos.scss';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import GetTodo from './GetTodo.tsx';
import { ReceivedTodoApiType } from '../../types.ts';
import TodoUnity from './TodoUnity.tsx';

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

const ListTodosContainer = () => {
  const [heightBlurBg, setHeightBlurBg] = useState<number>(0);
  const [hideList, setHideList] = useState<boolean>(false);
  const [settingsOpened, setSettingsOpened] = useState<boolean[]>([]);
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<ReceivedTodoApiType>();
  const [todosLength, setTodosLength] = useState(0);
  const [getTodosFromApi, setGetTodosFromApi] = useState<boolean>(false);
  const [todoClickedCount, setTodoClickedCount] = useState(0);

  const initSettings = () => {
    const initValues: boolean[] = [];

    if (todos) {
      for (let i = 0; i < todos.todo.length; i++) {
        if (!settingsOpened[i]) {
          initValues[i] = false;
        }
        setSettingsOpened(initValues);
      }
    }
  };

  if (todosLength != settingsOpened.length) {
    initSettings();
  }

  useEffect(() => {
    if (todosLength == 0) {
      setSettingsOpened([])
    }
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/todos').then(res => res.data);

        setTodos(response);
        setTodosLength(response.todo.length);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching todos:', error);
        setLoading(false);
      }
    };
    if (!getTodosFromApi) {
      fetchTodos();
      setGetTodosFromApi(true);
    }
    const expandBlurBg = async () => {
      let heightCounter = todoValues.pixelGap;

      if (todos && todos.todo) {
        if (todos.todo.length <= 0) {
          setHeightBlurBg(0);
        }
        todos.todo.forEach((todo) => {
          todo.title.length >= todoValues.littleSizeText
            ? (heightCounter += todoValues.bigSizeText)
            : (heightCounter += todoValues.littleSizeText);
          heightCounter += todoValues.pixelGap;
          setHeightBlurBg(heightCounter);
        });
      }
    };
    expandBlurBg();
  }, [heightBlurBg, todosLength, todoClickedCount]);

  const openTodoSettings = (key: number) => {
    settingsOpened[key] = !settingsOpened[key];
    setSettingsOpened(settingsOpened);
    setTodoClickedCount(todoClickedCount + 1)
  };

  return (
    <div>
      <GetTodo todosLength={todosLength} setTodosLength={setTodosLength} todos={todos} setTodos={setTodos}/>
      <TodosListHeader setHideList={setHideList} hideList={hideList} />
      <div className={'todos-list-container'}>
        <div
          className={'todos-list'}
          style={{ height: heightBlurBg + 'px', display: hideList ? 'none' : '' }}
        ></div>
        <div className={'todos-list-text'}>
          {loading ? <></> : todos ? todos.todo.map((todo, index) => {
            return <TodoUnity
              key={index}
              settingsOpened={settingsOpened}
              todo={todo}
              openTodoSettings={openTodoSettings}
              hideList={hideList}
              index={index}
              todos={todos}
              setTodos={setTodos}
              setTodosLength={setTodosLength}
              todosLength={todosLength}
            />
          }) : <></>}
        </div>
      </div>
    </div>
  );
};

export default ListTodosContainer;
