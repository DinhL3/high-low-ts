import { Routes, Route, Outlet } from 'react-router-dom';
import CardsContextProvider from './store/cards-context';
import UserContextProvider from './store/user-context';

import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
  PaletteColorOptions,
} from '@mui/material/styles';

import Home from './components/Home/Home';
import Play from './components/Play/Play';

declare module '@mui/material/styles' {
  interface CustomPalette {
    black: PaletteColorOptions;
    // add more colors here
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    black: true;
    //add more colors here
  }
}

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) =>
  augmentColor({ color: { main: mainColor } });

let theme = createTheme({
  typography: {
    fontFamily: ['Kanit', 'sans-serif'].join(','),
  },
  palette: {
    black: createColor('#000000'),
    //add more colors here
  },
});

theme = responsiveFontSizes(theme);

function BasicLayout() {
  return (
    <UserContextProvider>
      <CardsContextProvider>
        <ThemeProvider theme={theme}>
          <Outlet />
        </ThemeProvider>
      </CardsContextProvider>
    </UserContextProvider>
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
