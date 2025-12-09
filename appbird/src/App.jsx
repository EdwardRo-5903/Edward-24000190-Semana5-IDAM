import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import BirdList from './pages/BirdList';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/aves" element={<BirdList />} />
    </Routes>
  );
}

export default App;
