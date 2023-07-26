import { Button, Container, Typography, Box } from '@mui/material';
import { useState, useEffect } from 'react';

import PlayingCard from '../../models/playingCard';

const Play = () => {
  const [cardDeck, setCardDeck] = useState<PlayingCard[]>([]);
  const [currentCard, setCurrentCard] = useState<PlayingCard | null>(null);

  function buildCardDeck() {
    const suits: string[] = ['spades', 'clubs', 'diamonds', 'hearts'];

    //use modern js instead of nested for loop
    const deck = suits.flatMap((suit) =>
      Array.from({ length: 13 }, (_, index) => new PlayingCard(index + 2, suit))
    );

    console.log(deck);
    setCardDeck(deck);
  }

  function pickRandomCard() {
    if (cardDeck.length === 0) {
      console.log('No cards left in the deck!');
      setCurrentCard(null);
      return;
    }

    const randomIndex = Math.floor(Math.random() * cardDeck.length);
    const pickedCard = cardDeck[randomIndex];

    // Create a new array without the picked card
    const updatedDeck = cardDeck.filter((card) => card !== pickedCard);

    setCurrentCard(pickedCard);
    setCardDeck(updatedDeck);
    console.log('Picked Card:', pickedCard);
  }

  useEffect(() => {
    buildCardDeck();
    pickRandomCard();
  }, []);

  //   use buildCardDeck() in useEffect to make it execute only once
  // if the function is outside of useEffect, it will trigger every render

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant='h2' sx={{ mb: 2 }}>
        Game started
      </Typography>
      <Box>
        <Button
          sx={{ display: 'block', mb: 1 }}
          variant='contained'
          color='success'
        >
          High
        </Button>
        <Button sx={{ display: 'block' }} variant='contained' color='warning'>
          Low
        </Button>
      </Box>
    </Container>
  );
};

export default Play;
