import './styles/App.scss';
import TimerFormHandler from './components/Form/TimerFormHandler.tsx';
import Navbar from './components/Navbar.tsx';

function App() {
  return (
    <body>
      <Navbar />
      <TimerFormHandler />
    </body>
  );
}

export default App;
