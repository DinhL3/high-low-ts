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
  const [betAmount, setBetAmount] = useState<string>('');
  const [betAmountError, setBetAmountError] = useState<string | null>(null);
  const [userGuess, setUserGuess] = useState<null | string>(null);

  function handleGuessButtonClick(selected: string): void {
    setUserGuess((prevSelected) =>
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

  function handleSubmit(): void {
    if (!userGuess) {
      return;
    }

    if (betAmountError || !betAmount) {
      setBetAmountError('Please enter a valid bet amount');
      return;
    }

    const betData = {
      userGuess: userGuess,
      betAmount: Number(betAmount),
    };

    console.log('Bet Data:', betData);
  }

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
            variant={userGuess === 'higher' ? 'contained' : 'outlined'}
            color='primary'
            disableElevation
            disabled={
              cardsCtx.higherOrEqualProbability === 0 ||
              cardsCtx.higherOrEqualProbability === 1
            }
            onClick={() => handleGuessButtonClick('higher')}
          >
            <GuessButtonTextAndProbability
              type='higher'
              probability={cardsCtx.higherOrEqualProbability}
            />
          </Button>
          <Button
            sx={{}}
            variant={userGuess === 'lower' ? 'contained' : 'outlined'}
            color='warning'
            disableElevation
            disabled={
              cardsCtx.lowerOrEqualProbability === 0 ||
              cardsCtx.lowerOrEqualProbability === 1
            }
            onClick={() => handleGuessButtonClick('lower')}
          >
            <GuessButtonTextAndProbability
              type='lower'
              probability={cardsCtx.lowerOrEqualProbability}
            />
          </Button>
        </Box>
        <Box sx={buttonColumnStyles}>
          <Button
            variant={userGuess === 'black' ? 'contained' : 'outlined'}
            color='black'
            disableElevation
            onClick={() => handleGuessButtonClick('black')}
          >
            <GuessButtonTextAndProbability
              type='black'
              probability={cardsCtx.blackProbability}
            />
          </Button>
          <Button
            variant={userGuess === 'red' ? 'contained' : 'outlined'}
            color='error'
            disableElevation
            onClick={() => handleGuessButtonClick('red')}
          >
            <GuessButtonTextAndProbability
              type='red'
              probability={cardsCtx.redProbability}
            />
          </Button>
        </Box>
        <Box sx={buttonColumnStyles}>
          <Button
            variant={userGuess === '2-10' ? 'contained' : 'outlined'}
            color='primary'
            disableElevation
            onClick={() => handleGuessButtonClick('2-10')}
          >
            <GuessButtonTextAndProbability
              type='2-10'
              probability={cardsCtx.twoToTenProbability}
            />
          </Button>
          <Button
            variant={userGuess === 'JQKA' ? 'contained' : 'outlined'}
            color='secondary'
            disableElevation
            onClick={() => handleGuessButtonClick('JQKA')}
          >
            <GuessButtonTextAndProbability
              type='JQKA'
              probability={cardsCtx.jToAProbability}
            />
          </Button>
        </Box>
      </Box>
      {!userGuess && (
        <Alert sx={{ mb: 2 }} severity='warning'>
          Please choose your guess above
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
