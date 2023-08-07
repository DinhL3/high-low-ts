// Component that handle betting form. Includes toggle buttons, bet amount input and submit button

import { useState, useEffect, useContext } from 'react';
import {
  Button,
  Alert,
  Box,
  FormControl,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';

import { CardsContext } from '../../store/cards-context';
import betData from '../../models/betData';
import GuessButtonTextAndProbability from './GuessButtonTextAndProbability';

const BettingForm = () => {
  const cardsCtx = useContext(CardsContext);
  const [betAmount, setBetAmount] = useState<string>('');
  const [betAmountError, setBetAmountError] = useState<string | null>(null);
  const [userGuess, setUserGuess] = useState<null | string>(null);
  const [winningPayout, setWinningPayout] = useState<null | number>(null);

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

  function winningPayoutCalculator(): void {
    if (!userGuess || !betAmount || betAmountError) {
      setWinningPayout(null);
      return;
    }
    const betAmountNumber = Number(betAmount);
    const probability = cardsCtx[userGuess + 'Probability'];
    //set winning payout to 2 decimal places
    if (typeof probability === 'number' && probability > 0) {
      const payout = betAmountNumber / probability - betAmountNumber;
      const roundedPayout = Math.round(payout * 100) / 100; // Round to 2 decimal places
      setWinningPayout(roundedPayout);
    } else {
      setWinningPayout(null); // Handle the case where probability is not a number
    }
  }

  function resetForm() {
    setUserGuess(null);
    setBetAmount('');
    setBetAmountError(null);
    setWinningPayout(null);
  }

  function handleSubmit(): void {
    let data;
    if (userGuess && betAmount && winningPayout) {
      data = new betData(userGuess, Number(betAmount), winningPayout);
      cardsCtx.handleUserBetSubmit(data);
      resetForm();
    }
  }

  useEffect(() => {
    winningPayoutCalculator();
  }, [userGuess, betAmount]);

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
            variant={userGuess === 'higherOrEqual' ? 'contained' : 'outlined'}
            color='primary'
            disableElevation
            disabled={
              cardsCtx.higherOrEqualProbability === 0 ||
              cardsCtx.higherOrEqualProbability === 1
            }
            onClick={() => handleGuessButtonClick('higherOrEqual')}
          >
            <GuessButtonTextAndProbability
              type='higherOrEqual'
              probability={cardsCtx.higherOrEqualProbability}
            />
          </Button>
          <Button
            sx={{}}
            variant={userGuess === 'lowerOrEqual' ? 'contained' : 'outlined'}
            color='warning'
            disableElevation
            disabled={
              cardsCtx.lowerOrEqualProbability === 0 ||
              cardsCtx.lowerOrEqualProbability === 1
            }
            onClick={() => handleGuessButtonClick('lowerOrEqual')}
          >
            <GuessButtonTextAndProbability
              type='lowerOrEqual'
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
            variant={userGuess === 'twoToTen' ? 'contained' : 'outlined'}
            color='primary'
            disableElevation
            onClick={() => handleGuessButtonClick('twoToTen')}
          >
            <GuessButtonTextAndProbability
              type='twoToTen'
              probability={cardsCtx.twoToTenProbability}
            />
          </Button>
          <Button
            variant={userGuess === 'jackToAce' ? 'contained' : 'outlined'}
            color='secondary'
            disableElevation
            onClick={() => handleGuessButtonClick('jackToAce')}
          >
            <GuessButtonTextAndProbability
              type='jackToAce'
              probability={cardsCtx.jackToAceProbability}
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
        value={betAmount}
        sx={{ mb: 1 }}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          startAdornment: <InputAdornment position='start'>🪙</InputAdornment>,
        }}
        onChange={handleBetAmountChange}
        error={Boolean(betAmountError)}
        helperText={betAmountError}
      />
      {winningPayout && winningPayout > 0 && (
        <Typography variant='subtitle2' sx={{ mb: 2 }} color='grey'>
          Expected winning: 🪙{winningPayout}
        </Typography>
      )}
      <Button
        type='submit'
        variant='contained'
        color='success'
        disableElevation
        disabled={Boolean(betAmountError) || !userGuess}
        onClick={handleSubmit}
      >
        Bet
      </Button>
    </FormControl>
  );
};

export default BettingForm;
