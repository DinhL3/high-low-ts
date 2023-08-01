import { Button, Container, Typography, Box } from '@mui/material';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

import { useState, useEffect, useRef, useContext } from 'react';
import { CardsContext } from '../../store/cards-context';

import PokerCardFront from '../PokerCard/PokerCardFront';
import BettingForm from './BettingForm';

const Play = () => {
  const cardsCtx = useContext(CardsContext);

  useEffect(() => {
    cardsCtx.buildCardDeck();
  }, []);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
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
