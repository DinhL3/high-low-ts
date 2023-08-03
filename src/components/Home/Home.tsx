import { Button, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',        
      }}
    >
        <Typography variant='h1' sx={{mb: 2 }}>
          High Low
        </Typography>
      <Link to='/play'>
        <Button variant='contained' size='large'>
          Play
        </Button>
      </Link>
    </Container>
  );
};

export default Home;
