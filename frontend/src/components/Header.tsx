import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = Boolean(localStorage.getItem('token')); // Verifica se o token está presente, indicando que o usuário está logado
  const isHomePage = location.pathname === '/'; // Verifica se a página atual é a home

  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove o token para deslogar o usuário
    navigate('/login');  // Redireciona para a página de login após o logout
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#26293C' }}>
      <Toolbar>
        {/* Botão Home */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="logo"
          component={Link}
          to="/"
          sx={{ mr: 2 }}
        >
          <HomeIcon sx={{ fontSize: 40, color: '#FFFFFF' }} />
        </IconButton>
        
        {/* Espaço entre os ícones */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#FFFFFF' }}/>

        {/* Exibe botões de login e registro se o usuário não estiver logado e estiver na home */}
        {isHomePage && !isLoggedIn && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              component={Link}
              to="/login"
              sx={{ color: '#FFFFFF' }}
              startIcon={<LoginIcon sx={{ color: '#FFFFFF' }} />}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/register"
              sx={{ color: '#FFFFFF' }}
              startIcon={<PersonAddIcon sx={{ color: '#FFFFFF' }} />}
            >
              Register
            </Button>
          </Box>
        )}

        {/* Exibe o botão de dashboard e logout se o usuário estiver logado */}
        {isLoggedIn && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              component={Link}
              to="/dashboard"
              sx={{ color: '#FFFFFF' }}
              startIcon={<HomeIcon sx={{ color: '#FFFFFF' }} />}
            >
              Dashboard
            </Button>
            <Button
              sx={{ color: '#FFFFFF' }}
              onClick={handleLogout}
              startIcon={<LogoutIcon sx={{ color: '#FFFFFF' }} />}
            >
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;


