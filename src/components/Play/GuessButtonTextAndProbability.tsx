import { Box, Typography } from '@mui/material';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import NumbersIcon from '@mui/icons-material/Numbers';

interface GuessButtonTextAndProbabilityProps {
  type: 'higherOrEqual' | 'lowerOrEqual' | 'black' | 'red' | 'twoToTen' | 'jackToAce';
  probability: number;
}

const GuessButtonTextAndProbability = ({
  type,
  probability,
}: GuessButtonTextAndProbabilityProps) => {
  const Icon = () => {
    switch (type) {
      case 'higherOrEqual':
        return <KeyboardDoubleArrowUpIcon sx={{mr: 1}} fontSize='large' />;
      case 'lowerOrEqual':
        return <KeyboardDoubleArrowDownIcon sx={{mr: 1}} fontSize='large' />;
      case 'black':
        return (
          <Typography sx={{mr: 1}} variant='button' fontSize='1.5rem'>
            ♠♣
          </Typography>
        );
      case 'red':
        return (
          <Typography sx={{mr: 1}} variant='button' fontSize='1.5rem'>
            ♦♥
          </Typography>
        );
      case 'twoToTen':
        return <NumbersIcon sx={{ mr: 1 }} fontSize='large' />;
      case 'jackToAce':
        return (
          <Typography sx={{mr: 1}} variant='button' fontSize='1.5rem'>
            ♛
          </Typography>
        );
      default:
        return null;
    }
  };

  let text: string;
  // alternative to using if else
  const typeToTextMap: { [key: string]: string } = {
    higherOrEqual: 'Higher or same',
    lowerOrEqual: 'Lower or same',
    black: 'Black',
    red: 'Red',
    twoToTen: '2 - 10',
    jackToAce: 'JQKA',
  };

  text = typeToTextMap[type];

  function convertProbabilityToPercentageString(probability: number): string {
    return (probability * 100).toFixed(2) + '%';
  }

  return (
    <>
      <Icon />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          pt: 1,
          pb: 1,
        }}
      >
        <Typography
          variant='body1'
          fontSize='medium'
          lineHeight='1'
          fontWeight='600'
          mb={0.3}
        >
          {text}
        </Typography>
        <Typography variant='caption' lineHeight='1'>
          {convertProbabilityToPercentageString(probability)}
        </Typography>
      </Box>
    </>
  );
};

export default GuessButtonTextAndProbability;
