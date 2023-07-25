import { Routes, Route, Outlet } from 'react-router-dom';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';

import Home from './components/Home/Home';
import Play from './components/Play/Play';

let theme = createTheme({
  typography: {
    fontFamily: ['Kanit', 'sans-serif'].join(','),
  },
});

theme = responsiveFontSizes(theme);

function BasicLayout() {
  return (
    <ThemeProvider theme={theme}>
      <Outlet />
    </ThemeProvider>
  );
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
