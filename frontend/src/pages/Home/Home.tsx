import React from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center', // Centraliza o texto no componente Box
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            Bem-vindo à Plataforma de Engajamento de Influenciadores
          </Typography>
          <Typography variant="body1" component="p" sx={{ mt: 2 }}>
            Conecte marcas a influenciadores e gerencie suas campanhas de marketing com facilidade
            e eficiência.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;

