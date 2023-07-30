// Component that handle betting form. Includes toggle buttons, bet amount input and submit button

import { useState } from 'react';
import {
  Button,
  Container,
  Typography,
  Box,
  FormControl,
  TextField,
} from '@mui/material';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { CardsContext } from '../../store/cards-context';

const BettingForm = () => {
  const [selectedHigherOrLower, setSelectedHigherOrLower] = useState<
    null | 'higher' | 'lower'
  >(null);
  const [selectedColor, setSelectedColor] = useState<null | 'black' | 'red'>(
    null
  );
  const [selectedRange, setSelectedRange] = useState<null | '2-10' | 'JQKA'>(
    null
  );

  function handleHigherOrLowerClick(selected: 'higher' | 'lower'): void {
    setSelectedHigherOrLower((prevSelected) =>
      prevSelected === selected ? null : selected
    );
  }

  function handleColorClick(selected: 'black' | 'red'): void {
    setSelectedColor((prevSelected) =>
      prevSelected === selected ? null : selected
    );
  }

  function handleRangeClick(selected: '2-10' | 'JQKA'): void {
    setSelectedRange((prevSelected) =>
      prevSelected === selected ? null : selected
    );
  }

  return (
    <FormControl>
      <Box className='button-columns-box' sx={{ display: 'flex', gap: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button
            variant={
              selectedHigherOrLower === 'higher' ? 'contained' : 'outlined'
            }
            color='primary'
            disableElevation
            startIcon={<KeyboardDoubleArrowUpIcon />}
            onClick={() => handleHigherOrLowerClick('higher')}
          >
            Higher or same
          </Button>
          <Button
            sx={{}}
            variant={
              selectedHigherOrLower === 'lower' ? 'contained' : 'outlined'
            }
            color='warning'
            disableElevation
            startIcon={<KeyboardDoubleArrowDownIcon />}
            onClick={() => handleHigherOrLowerClick('lower')}
          >
            Lower or same
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button
            // sx={{ color: 'black' }}
            variant={selectedColor === 'black' ? 'contained' : 'outlined'}
            color='black'
            disableElevation
            startIcon={'♠♣'}
            onClick={() => handleColorClick('black')}
          >
            Black
          </Button>
          <Button
            variant={selectedColor === 'red' ? 'contained' : 'outlined'}
            color='error'
            disableElevation
            startIcon={'♦♥'}
            onClick={() => handleColorClick('red')}
          >
            Red
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button
            variant={selectedRange === '2-10' ? 'contained' : 'outlined'}
            color='primary'
            disableElevation
            onClick={() => handleRangeClick('2-10')}
          >
            2-10
          </Button>
          <Button
            variant={selectedRange === 'JQKA' ? 'contained' : 'outlined'}
            color='secondary'
            disableElevation
            onClick={() => handleRangeClick('JQKA')}
          >
            JQKA
          </Button>
        </Box>
      </Box>
    </FormControl>
  );
};

export default BettingForm;
