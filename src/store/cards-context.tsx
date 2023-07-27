import React, { createContext, useState, useRef } from 'react';
import PlayingCard from '../models/playingCard';

type CardsContextObj = {
  cardDeck: PlayingCard[];
  currentCard: PlayingCard | null;
  buildCardDeck: () => void;
  pickRandomCard: () => void;
};

export const CardsContext = createContext<CardsContextObj>({
  cardDeck: [],
  currentCard: null,
  buildCardDeck: () => {},
  pickRandomCard: () => {},
});

interface Props {
  children: React.ReactNode;
}

const CardsContextProvider = ({ children }: Props) => {
  const deckRef = useRef<PlayingCard[]>([]);
  const [currentCard, setCurrentCard] = useState<PlayingCard | null>(null);

  function buildCardDeck(): void {
    const suits: string[] = ['spades', 'clubs', 'diamonds', 'hearts'];

    //use modern js instead of nested for loop
    const newDeck = suits.flatMap((suit) =>
      Array.from({ length: 13 }, (_, index) => new PlayingCard(index + 2, suit))
    );

    deckRef.current = newDeck;
    // console.log('New deck: ', deckRef.current);

    pickRandomCard();
  }

  function pickRandomCard(): void {
    if (deckRef.current.length === 0) {
      console.log('No cards left in the deck!');
    }

    const randomIndex = Math.floor(Math.random() * deckRef.current.length);
    const pickedCard = deckRef.current[randomIndex];

    // Create a new array without the picked card
    const updatedDeck = deckRef.current.filter((card) => card !== pickedCard);

    deckRef.current = updatedDeck;
    setCurrentCard(pickedCard);
    // console.log('Picked Card:', pickedCard);
    // console.log('Deck after picking: ', deckRef.current);
  }

  const contextValue: CardsContextObj = {
    cardDeck: deckRef.current,
    currentCard: currentCard,
    buildCardDeck: buildCardDeck,
    pickRandomCard: pickRandomCard,
  };

  return (
    <CardsContext.Provider value={contextValue}>
      {children}
    </CardsContext.Provider>
  );
};

export default CardsContextProvider;
