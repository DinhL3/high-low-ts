import { Button, Container, Typography, Box } from '@mui/material';
import { useState, useEffect, useRef } from 'react';

import PlayingCard from '../../models/playingCard';
import PokerCardFront from '../PokerCard/PokerCardFront';

const Play = () => {
  // const [cardDeck, setCardDeck] = useState<PlayingCard[]>([]);
  const deckRef = useRef<PlayingCard[]>([])
  const [currentCard, setCurrentCard] = useState<PlayingCard | null>(null);

  function buildCardDeck(): void {
    const suits: string[] = ['spades', 'clubs', 'diamonds', 'hearts'];

    //use modern js instead of nested for loop
    const newDeck = suits.flatMap((suit) =>
      Array.from({ length: 13 }, (_, index) => new PlayingCard(index + 2, suit))
    );

    deckRef.current = newDeck;
    console.log('New deck: ', deckRef.current);

    pickRandomCard(deckRef.current);
  }

  function pickRandomCard(deck: PlayingCard[]): void {
    if (deck.length === 0) {
      console.log('No cards left in the deck!');    
    }

    const randomIndex = Math.floor(Math.random() * deck.length);
    const pickedCard = deck[randomIndex];

    // Create a new array without the picked card
    const updatedDeck = deck.filter((card) => card !== pickedCard);
    
    deckRef.current = updatedDeck;
    setCurrentCard(pickedCard)
    console.log('Picked Card:', pickedCard);
    console.log('Deck after picking: ',deckRef.current);
  }

  useEffect(() => {
    buildCardDeck();    
  }, []);

  // useEffect(() => {
  //   pickRandomCard();
  // }, [cardDeck]);

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
        <PokerCardFront card={currentCard}/>
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
