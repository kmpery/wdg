import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AudioPlayer from './components/AudioPlayer';
import useStore from './store/useStore';

function App() {
  const isOpen = useStore((state) => state.isOpen);

  return (
    <Router>
      <div className='relative'>
        {isOpen && <AudioPlayer />}
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/:recipientName' element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
