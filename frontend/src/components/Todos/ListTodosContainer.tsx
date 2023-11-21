import '../../styles/ListTodos.scss';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { TodoList } from '../../types.ts';
import axios from "axios";
import { Logger } from "sass";

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
  const [todosTest, setTodos] = useState([]);
  const [heightBlurBg, setHeightBlurBg] = useState<number>(0);
  const [hideList, setHideList] = useState<boolean>(false);
  const [settingsOpened, setSettingsOpened] = useState<boolean[]>([]);
  const [loading, setLoading] = useState(true);

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
    const fetchTodos = async () => {
      try {
        // Make a GET request to localhost:8080/todos
        const response = await axios.get('http://localhost:8080/todos');

        // Set the todos state with the fetched data
        setTodos(response.data);
        // Set loading to false once data is fetched
        setLoading(false);
      } catch (error) {
        // Handle errors, e.g., log the error or show an error message to the user
        console.error('Error fetching todos:', error);
        // Set loading to false in case of an error
        setLoading(false);
      }
    };
    fetchTodos();
    const expandBlurBg = async () => {
      let heightCounter = todoValues.pixelGap;
      const myTodos = await axios.get('http://localhost:8080/todos').then(res => res.data)


      console.log(todosTest.todo);
      console.log(myTodos);
      if (myTodos.todo) {
        console.log("sup");
        myTodos.todo.forEach((todo) => {
          todo.title.length >= todoValues.littleSizeText
            ? (heightCounter += todoValues.bigSizeText)
            : (heightCounter += todoValues.littleSizeText);
          heightCounter += todoValues.pixelGap;
          setHeightBlurBg(heightCounter);
        });
      }
    };
    expandBlurBg();
    /* if (todos.length <= 0) {
      setHeightBlurBg(0);
    } */
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
          {loading ? <></> : todosTest.todo.map((todo, index) => {
            return settingsOpened[index] ? (
              <div
                key={index}
                className={'todo-text-element'}
                style={{
                  overflow: 'hidden',
                  height: todo.title.length >= 50 ? '75px' : '150px',
                  display: hideList ? 'none' : '',
                }}
                onClick={() => openTodoSettings(index)}
              >
                <p>{todo.title}</p>
              </div>
            ) : (
              <div
                key={index}
                className={'todo-text-element'}
                style={{
                  overflow: 'hidden',
                  height: todo.title.length >= 50 ? '75px' : '50px',
                  display: hideList ? 'none' : '',
                }}
                onClick={() => openTodoSettings(index)}
              >
                <p>{todo.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ListTodosContainer;
