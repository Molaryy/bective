import TimerFormHandler from './components/Form/TimerFormHandler.tsx';
import Navbar from './components/Navbar.tsx';
import ListTodosContainer from './components/todos/ListTodosContainer.tsx';
import GetTodo from './components/todos/GetTodo.tsx';

function App() {
  return (
    <>
      <Navbar />
      <TimerFormHandler />
      <GetTodo />
      <ListTodosContainer />
    </>
  );
}

export default App;
