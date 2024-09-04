import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Paper, Card, CardContent, CardActionArea, IconButton, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Dashboard = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 4, // Margin inferior para espaçamento entre o ícone e o conteúdo
          }}
        >
          <IconButton sx={{ color: '#26293C' }}>
            <DashboardIcon fontSize="large" />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, // Layout em grid responsivo para diferentes tamanhos de tela
            gap: 2, // Espaçamento entre os cards
          }}
        >
          {/* Card para Gerenciar Influenciadores */}
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea component={Link} to="/influencers">
              <CardContent>
                <Typography variant="h6" component="div" align="center">
                  Gerenciar Influenciadores
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          {/* Card para Gerenciar Marcas */}
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea component={Link} to="/brands">
              <CardContent>
                <Typography variant="h6" component="div" align="center">
                  Gerenciar Marcas
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          {/* Card para Buscar Influenciadores */}
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea component={Link} to="/influencers/search">
              <CardContent>
                <Typography variant="h6" component="div" align="center">
                  Buscar Influenciadores
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          {/* Card para Associar Influenciador a Marca */}
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea component={Link} to="/brands/associate/:id">
              <CardContent>
                <Typography variant="h6" component="div" align="center">
                  Associar Influenciador a Marca
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      </Paper>
    </Container>
  );
};

export default Dashboard;
