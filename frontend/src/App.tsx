import Navbar from './components/Navbar.tsx';
import TimerFormHandler from './components/Form/TimerFormHandler.tsx';
import ListTodosContainer from './components/Todos/ListTodosContainer.tsx';

function App() {

  return (
    <>
      <Navbar />
      <TimerFormHandler />
      <ListTodosContainer/>
    </>
  );
}

export default App;
