import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  useContext,
} from 'react';
import PlayingCard from '../models/playingCard';
import betData from '../models/betData';

import { UserContext } from './user-context';

import { toast } from 'react-toastify';

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
  handleUserBetSubmit: (data: betData) => void;
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
  handleUserBetSubmit: () => {},
});

interface Props {
  children: React.ReactNode;
}

const CardsContextProvider = ({ children }: Props) => {
  const deckRef = useRef<PlayingCard[]>([]);
  const prevCardRef = useRef<PlayingCard | null>(null);
  // const [currentCard, setCurrentCard] = useState<PlayingCard | null>(null);
  const currentCardRef = useRef<PlayingCard | null>(null);
  const [playedCards, setPlayedCards] = useState<PlayingCard[]>([]);

  const [higherOrEqualProbability, setHigherOrEqualProbability] =
    useState<number>(0);
  const [lowerOrEqualProbability, setLowerOrEqualProbability] =
    useState<number>(0);
  const [blackProbability, setBlackProbability] = useState<number>(0);
  const [redProbability, setRedProbability] = useState<number>(0);
  const [twoToTenProbability, setTwoToTenProbability] = useState<number>(0);
  const [jackToAceProbability, setjackToAceProbability] = useState<number>(0);

  const userCtx = useContext(UserContext);

  // write function to calculate all the probabilities
  function calculateProbabilities(): void {
    if (deckRef.current.length === 0 || !currentCardRef.current) {
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
      if (card.value >= currentCardRef.current!.value) {
        higherOrEqualCount++;
      }

      if (card.value <= currentCardRef.current!.value) {
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
    prevCardRef.current = currentCardRef.current;
    currentCardRef.current = pickedCard;
    // setCurrentCard(pickedCard);
    setPlayedCards((prevPlayedCards) => [...prevPlayedCards, pickedCard]);
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

  function handleUserBetSubmit(data: betData): void {
    pickRandomCard();

    if (currentCardRef.current === null || prevCardRef.current === null) {
      return;
    }

    let isCorrect = false;
    const currentValue = currentCardRef.current.value;
    const currentSuit = currentCardRef.current.suit;

    switch (data.userGuess) {
      case 'higherOrEqual':
        isCorrect = currentValue >= prevCardRef.current.value;
        break;
      case 'lowerOrEqual':
        isCorrect = currentValue <= prevCardRef.current.value;
        break;
      case 'black':
        isCorrect = currentSuit === 'spades' || currentSuit === 'clubs';
        break;
      case 'red':
        isCorrect = currentSuit === 'diamonds' || currentSuit === 'hearts';
        break;
      case 'twoToTen':
        isCorrect = currentValue >= 2 && currentValue <= 10;
        break;
      case 'jackToAce':
        isCorrect = currentValue >= 11 && currentValue <= 14;
        break;
    }

    if (isCorrect) {
      console.log('Correct!');
      userCtx.addBalance(data.winningPayout);
      toast(`🎉 Correct! You won 🪙${data.winningPayout}`, {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else {
      console.log('Wrong!');
      userCtx.deductBalance(data.betAmount);
      toast.error(`That was wrong. You lost 🪙${data.betAmount}`, {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }

  const contextValue: CardsContextObj = {
    cardDeck: deckRef.current,
    currentCard: currentCardRef.current,
    playedCards: playedCards,
    higherOrEqualProbability: higherOrEqualProbability,
    lowerOrEqualProbability: lowerOrEqualProbability,
    blackProbability: blackProbability,
    redProbability: redProbability,
    twoToTenProbability: twoToTenProbability,
    jackToAceProbability: jackToAceProbability,
    buildCardDeck: buildCardDeck,
    pickRandomCard: pickRandomCard,
    handleUserBetSubmit: handleUserBetSubmit,
  };

  useEffect(() => {
    calculateProbabilities();
  }, [currentCardRef.current]);

  return (
    <CardsContext.Provider value={contextValue}>
      {children}
    </CardsContext.Provider>
  );
};

export default CardsContextProvider;
