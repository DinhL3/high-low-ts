import { Button, Container, Typography, Box } from '@mui/material';
import { useState } from 'react';

import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const Play = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <ThemeProvider theme={theme}>
        <Typography variant='h2'>Game started!</Typography>
      </ThemeProvider>
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
