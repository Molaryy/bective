import Navbar from './components/Navbar/Navbar.tsx';
import TimerFormHandler from './components/Form/TimerFormHandler.tsx';
import TodosHandler from './components/Todos/TodosHandler.tsx';

function App() {
  return (
    <>
      <Navbar />
      <div className={'test'}>
        <div className={'todos-parent'}>
          <TimerFormHandler />
          <TodosHandler />
        </div>
      </div>
    </>
  );
}

export default App;
