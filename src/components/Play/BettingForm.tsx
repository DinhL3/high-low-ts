import { Button, Container, Typography, Box } from '@mui/material';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { CardsContext } from '../../store/cards-context';

const BettingForm = () => {
  return (
    <Box className='button-columns-box' sx={{ display: 'flex', gap: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Button
          variant='outlined'
          color='primary'
          disableElevation
          startIcon={<KeyboardDoubleArrowUpIcon />}
        >
          Higher or same
        </Button>
        <Button
          sx={{}}
          variant='outlined'
          color='warning'
          disableElevation
          startIcon={<KeyboardDoubleArrowDownIcon />}
        >
          Lower or same
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Button
          sx={{ color: 'black' }}
          variant='outlined'
          color='inherit'
          disableElevation
          startIcon={'♠♣'}
        >
          Black
        </Button>
        <Button
          variant='outlined'
          color='error'
          disableElevation
          startIcon={'♦♥'}
        >
          Red
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Button variant='outlined' color='primary' disableElevation>
          2-10
        </Button>
        <Button variant='outlined' color='secondary' disableElevation>
          JQKA
        </Button>
      </Box>
    </Box>
  );
};

export default BettingForm;
