import { Button, Container, Typography, Box } from '@mui/material';
import { useState } from 'react';

const Play = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant='h2' sx={{ mb: 2 }}>
        Game started!
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
