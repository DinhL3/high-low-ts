import { Box } from '@mui/material';
import PlayingCard from '../../models/playingCard';
import styles from './PokerCardFront.module.scss';

interface PokerCardFrontProps {
  card: PlayingCard | null;
}

const PokerCardFront = ({ card }: PokerCardFrontProps) => {
  if (!card) {
    return null;
  }

  const { value, suit } = card;

  let valueString: string;
  let suitString: string = suit.charAt(0).toUpperCase();

  if (value <= 10) {
    valueString = String(value);
  } else {
    switch (value) {
      case 11:
        valueString = 'J';
        break;
      case 12:
        valueString = 'Q';
        break;
      case 13:
        valueString = 'K';
        break;
      case 14:
        valueString = 'A';
        break;
      default:
        valueString = '';
        break;
    }
  }

  const cardFileName: string = `${valueString}${suitString}.svg`;

  return (
    <Box mb={2}>
      <img
        src={`/cards/${cardFileName}`}
        alt={`Card ${valueString}${suitString}`}
        style={{  height: '150px' }}        
      />
    </Box>
  );
};

export default PokerCardFront;
