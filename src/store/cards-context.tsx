import React, { createContext, useState, useRef, useEffect } from 'react';
import PlayingCard from '../models/playingCard';

type CardsContextObj = {
  cardDeck: PlayingCard[];
  currentCard: PlayingCard | null;
  playedCards: PlayingCard[];
  higherOrEqualProbability: number;
  lowerOrEqualProbability: number;
  blackProbability: number;
  redProbability: number;
  twoToTenProbability: number;
  jackToAceProbability: number;
  buildCardDeck: () => void;
  pickRandomCard: () => void;
  [key: string]: any;
};

export const CardsContext = createContext<CardsContextObj>({
  cardDeck: [],
  currentCard: null,
  playedCards: [],
  higherOrEqualProbability: 0,
  lowerOrEqualProbability: 0,
  blackProbability: 0,
  redProbability: 0,
  twoToTenProbability: 0,
  jackToAceProbability: 0,
  buildCardDeck: () => {},
  pickRandomCard: () => {},
});

interface Props {
  children: React.ReactNode;
}

const CardsContextProvider = ({ children }: Props) => {
  const deckRef = useRef<PlayingCard[]>([]);
  const [currentCard, setCurrentCard] = useState<PlayingCard | null>(null);
  const [playedCards, setPlayedCards] = useState<PlayingCard[]>([]);
  const [higherOrEqualProbability, setHigherOrEqualProbability] = useState<number>(0);
  const [lowerOrEqualProbability, setLowerOrEqualProbability] = useState<number>(0);
  const [blackProbability, setBlackProbability] = useState<number>(0);
  const [redProbability, setRedProbability] = useState<number>(0);
  const [twoToTenProbability, setTwoToTenProbability] = useState<number>(0);
  const [jackToAceProbability, setjackToAceProbability] = useState<number>(0);

  // write function to calculate all the probabilities
  function calculateProbabilities(): void {
    if (deckRef.current.length === 0 || !currentCard) {
      return;
    }

    const totalCards = deckRef.current.length;

    let higherOrEqualCount = 0;
    let lowerOrEqualCount = 0;
    let blackCount = 0;
    let redCount = 0;
    let twoToTenCount = 0;
    let jackToAceCount = 0;

    deckRef.current.forEach((card) => {
      if (card.value >= currentCard.value) {
        higherOrEqualCount++;
      } 
      
      if (card.value <= currentCard.value) {
        lowerOrEqualCount++;
      }

      if (card.suit === 'spades' || card.suit === 'clubs') {
        blackCount++;
      } else {
        redCount++;
      }

      if (card.value >= 2 && card.value <= 10) {
        twoToTenCount++;
      } else {
        jackToAceCount++;
      }
    });

    // Calculate probabilities
    setHigherOrEqualProbability(higherOrEqualCount / totalCards);
    setLowerOrEqualProbability(lowerOrEqualCount / totalCards);
    setBlackProbability(blackCount / totalCards);
    setRedProbability(redCount / totalCards);
    setTwoToTenProbability(twoToTenCount / totalCards);
    setjackToAceProbability(jackToAceCount / totalCards);
  }

  function pickRandomCard(): void {
    if (deckRef.current.length === 0) {
      console.log('No cards left in the deck!');
      return;
    }

    const randomIndex = Math.floor(Math.random() * deckRef.current.length);
    const pickedCard = deckRef.current[randomIndex];
    const updatedDeck = deckRef.current.filter((card) => card !== pickedCard);
    deckRef.current = updatedDeck;
    setCurrentCard(pickedCard);
    setPlayedCards((prevPlayedCards) => [...prevPlayedCards, pickedCard]);
    // console.log('Picked Card:', pickedCard);
    // console.log('Deck after picking: ', deckRef.current);
  }

  function buildCardDeck(): void {
    const suits: string[] = ['spades', 'clubs', 'diamonds', 'hearts'];

    //use modern js instead of nested for loop
    const newDeck = suits.flatMap((suit) =>
      Array.from({ length: 13 }, (_, index) => new PlayingCard(index + 2, suit))
    );

    deckRef.current = newDeck;

    pickRandomCard();
  }

  const contextValue: CardsContextObj = {
    cardDeck: deckRef.current,
    currentCard: currentCard,
    playedCards: playedCards,
    higherOrEqualProbability: higherOrEqualProbability,
    lowerOrEqualProbability: lowerOrEqualProbability,
    blackProbability: blackProbability,
    redProbability: redProbability,
    twoToTenProbability: twoToTenProbability,
    jackToAceProbability: jackToAceProbability,
    buildCardDeck: buildCardDeck,
    pickRandomCard: pickRandomCard,
  };

  useEffect(() => {
    calculateProbabilities();
  }, [currentCard]);

  return (
    <CardsContext.Provider value={contextValue}>
      {children}
    </CardsContext.Provider>
  );
};

export default CardsContextProvider;
