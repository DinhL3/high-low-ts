import { Button, Container, Typography, Box } from '@mui/material';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

import { useState, useEffect, useRef, useContext } from 'react';
import { CardsContext } from '../../store/cards-context';
import { UserContext } from '../../store/user-context';

import PokerCardFront from '../PokerCard/PokerCardFront';
import BettingForm from './BettingForm';

const Play = () => {
  const cardsCtx = useContext(CardsContext);
  const userCtx = useContext(UserContext);

  useEffect(() => {
    cardsCtx.buildCardDeck();
    userCtx.loginUser('Dinh', 100);
  }, []);

  return (
    <Container
      sx={{
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant='body1' sx={{
        position: 'absolute',
        top: 0,
        right: '1rem',
      }}>Balance: 🪙{userCtx.user?.balance}</Typography>
      <Typography variant='h4' sx={{ mb: 1 }} color='primary'>
        Guess the next card
      </Typography>
      <Typography variant='subtitle1' sx={{ mb: 2 }} color='grey'>
        Ace is high. Two is low
      </Typography>
      <PokerCardFront card={cardsCtx.currentCard} />
      <BettingForm/>      
    </Container>
  );
};

export default Play;
