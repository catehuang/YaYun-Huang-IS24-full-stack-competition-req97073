import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
