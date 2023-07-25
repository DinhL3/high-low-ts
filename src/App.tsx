import './App.scss';
import { Routes, Route, Outlet } from 'react-router-dom';

import Home from './components/Home/Home';
import Play from './components/Play/Play';

function BasicLayout() {
  return <Outlet />;
}

function App() {
  return (
    <Routes>
      <Route path='/' element={<BasicLayout />}>
        <Route index element={<Home />} />
        <Route path='play' element={<Play />} />
      </Route>
    </Routes>
  );
}

export default App;
