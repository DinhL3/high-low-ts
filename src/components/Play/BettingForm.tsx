// Component that handle betting form. Includes toggle buttons, bet amount input and submit button

import { useState, useEffect, useContext } from 'react';
import {
  Button,
  Alert,
  Box,
  FormControl,
  TextField,
  Typography,
} from '@mui/material';

import { CardsContext } from '../../store/cards-context';
import GuessButtonTextAndProbability from './GuessButtonTextAndProbability';

const BettingForm = () => {
  const cardsCtx = useContext(CardsContext);
  const [selectedHigherOrLower, setSelectedHigherOrLower] = useState<
    null | 'higher' | 'lower'
  >(null);
  const [selectedColor, setSelectedColor] = useState<null | 'black' | 'red'>(
    null
  );
  const [selectedRange, setSelectedRange] = useState<null | '2-10' | 'JQKA'>(
    null
  );
  const [betAmount, setBetAmount] = useState<string>('');
  const [betAmountError, setBetAmountError] = useState<string | null>(null);
  const [isNoGuessSelected, setIsNoGuessSelected] = useState<boolean>(true);

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

  function handleBetAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
    const betAmountInput = event.target.value;

    const positiveIntegerPattern = /^[1-9]\d*$/;

    if (!positiveIntegerPattern.test(betAmountInput)) {
      setBetAmountError('Please enter a valid bet amount');
    } else {
      setBetAmountError(null);
    }

    setBetAmount(betAmountInput);
  }

  // put this function in useEffect is correct, because it will be called every time state of buttons change
  // the function depends on state of buttons, not the clicks
  function handleGuessSelectionCheck(): void {
    if (!selectedHigherOrLower && !selectedColor && !selectedRange) {
      setIsNoGuessSelected(true);
    } else {
      setIsNoGuessSelected(false);
    }
  }

  function handleSubmit(): void {
    if (isNoGuessSelected) {
      return;
    }

    if (betAmountError || !betAmount) {
      setBetAmountError('Please enter a valid bet amount');
      return;
    }

    const betData = {
      selectedHigherOrLower: selectedHigherOrLower,
      selectedColor: selectedColor,
      selectedRange: selectedRange,
      betAmount: Number(betAmount),
    };

    console.log('Bet Data:', betData);
  }

  // write function to convert probability to percentage string

  useEffect(() => {
    handleGuessSelectionCheck();
  }, [selectedColor, selectedHigherOrLower, selectedRange]);

  const buttonColumnStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  };
  

  return (
    <FormControl>
      <Box
        className='button-columns-box'
        sx={{ display: 'flex', gap: 2, mb: 2 }}
      >
        <Box sx={buttonColumnStyles}>
          <Button
            variant={
              selectedHigherOrLower === 'higher' ? 'contained' : 'outlined'
            }
            color='primary'
            disableElevation
            disabled={cardsCtx.higherOrEqualProbability === 0 || cardsCtx.higherOrEqualProbability === 1}
            onClick={() => handleHigherOrLowerClick('higher')}
          >
            <GuessButtonTextAndProbability
              type='higher'
              probability={cardsCtx.higherOrEqualProbability}
            />
          </Button>
          <Button
            sx={{}}
            variant={
              selectedHigherOrLower === 'lower' ? 'contained' : 'outlined'
            }
            color='warning'
            disableElevation
            disabled={cardsCtx.lowerOrEqualProbability === 0 || cardsCtx.lowerOrEqualProbability === 1}
            onClick={() => handleHigherOrLowerClick('lower')}
          >
            <GuessButtonTextAndProbability
              type='lower'
              probability={cardsCtx.lowerOrEqualProbability}
            />
          </Button>
        </Box>
        <Box sx={buttonColumnStyles}>
          <Button
            variant={selectedColor === 'black' ? 'contained' : 'outlined'}
            color='black'
            disableElevation
            onClick={() => handleColorClick('black')}
          >
            <GuessButtonTextAndProbability
              type='black'
              probability={cardsCtx.blackProbability}
            />
          </Button>
          <Button
            variant={selectedColor === 'red' ? 'contained' : 'outlined'}
            color='error'
            disableElevation
            onClick={() => handleColorClick('red')}
          >
            <GuessButtonTextAndProbability
              type='red'
              probability={cardsCtx.redProbability}
            />
          </Button>
        </Box>
        <Box sx={buttonColumnStyles}>
          <Button
            variant={selectedRange === '2-10' ? 'contained' : 'outlined'}
            color='primary'
            disableElevation
            onClick={() => handleRangeClick('2-10')}
          >
            <GuessButtonTextAndProbability
              type='2-10'
              probability={cardsCtx.twoToTenProbability}
            />
          </Button>
          <Button
            variant={selectedRange === 'JQKA' ? 'contained' : 'outlined'}
            color='secondary'
            disableElevation
            onClick={() => handleRangeClick('JQKA')}
          >
            <GuessButtonTextAndProbability
              type='JQKA'
              probability={cardsCtx.jToAProbability}
            />
          </Button>
        </Box>
      </Box>
      {isNoGuessSelected && (
        <Alert sx={{ mb: 2 }} severity='warning'>
          Please choose at least one guess above
        </Alert>
      )}
      <TextField
        id='bet-amount'
        label='Bet amount'
        sx={{ mb: 2 }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleBetAmountChange}
        error={Boolean(betAmountError)}
        helperText={betAmountError}
      />
      <Button
        type='submit'
        variant='contained'
        color='success'
        disableElevation
        onClick={handleSubmit}
      >
        Bet
      </Button>
    </FormControl>
  );
};

export default BettingForm;
