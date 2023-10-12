'use client';

import Navbar from "../components/Navbar.tsx";
import TimerFormHandler from "../components/Form/TimerFormHandler.tsx";
import GetTodo from "../components/Todos/GetTodo.tsx";
import ListTodosContainer from "../components/Todos/ListTodosContainer.tsx";
import Todos from '../lib/todos';
import { useState } from "react";

const Home = () => {
  const userTodos = new Todos();
  const [todos, setTodos] = useState(userTodos.getTodos());

  return (
    <>
      <Navbar />
      <TimerFormHandler />
      <GetTodo todos={todos} setTodos={setTodos} />
      <ListTodosContainer todos={todos} />
    </>
  );
}

export default Home;
