import { Button, Container, Typography, Box } from '@mui/material';
import { useState, useEffect } from 'react';

import PlayingCard from '../../models/playingCard';

const Play = () => {
  //   const [cardDeck, setCardDeck] = useState<PlayingCard[]>([]);
  let deck: PlayingCard[];

  function buildCardDeck() {
    const suits: string[] = ['spades', 'clubs', 'diamonds', 'hearts'];

    //use modern js instead of nested for loop
    deck = suits.flatMap((suit) =>
      Array.from({ length: 13 }, (_, index) => new PlayingCard(index + 2, suit))
    );

    console.log(deck);
  }

//   useEffect(() => {
//     buildCardDeck();
//   }, []);

  buildCardDeck();

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
