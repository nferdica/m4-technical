import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Importa o toast para exibir notificações
import { useNavigate, Link } from 'react-router-dom';
import { Button, Box, TextField, Typography, Container, Paper } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState(''); // Estado para armazenar o email
  const [password, setPassword] = useState(''); // Estado para armazenar a senha
  const navigate = useNavigate();

  // Função para validar o email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar email
    return emailRegex.test(email);
  };

  // Função para validar a senha
  const validatePassword = (password: string) => {
    return password.length >= 6; // A senha deve ter no mínimo 6 caracteres
  };

  // Função para lidar com o envio do formulário de login
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validação de email
    if (!validateEmail(email)) {
      toast.error('Por favor, insira um email válido.');
      return;
    }

    // Validação de senha
    if (!validatePassword(password)) {
      toast.error('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token); // Armazena o token no localStorage
      toast.success('Login feito com sucesso!'); // Exibe mensagem de sucesso
      navigate('/'); // Redireciona para a página inicial após login bem-sucedido
    } catch (error) {
      toast.error('Credenciais incorretas!'); // Exibe mensagem de erro
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, mt: 8, bgcolor: '#FFF' }}>
        {/* Título da página */}
        <Typography component="h1" variant="h5" align="center" gutterBottom color='#000' fontWeight="bold">
          Login
        </Typography>
        
        {/* Formulário de login */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& .MuiTextField-root': { m: 1, width: '100%' }, // Estilo dos campos de input
            '& .MuiInputLabel-root': { 
              color: '#000', fontWeight: 'bold', // Estilo da label
              '&.Mui-focused': { color: '#000' }, // Cor da label ao focar
            },
            '& .MuiInputBase-root': {
              color: '#000', bgcolor: '#ffffff', // Cor do texto e fundo dos inputs
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d752d2', // Cor da borda ao hover
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d752d2', // Cor da borda ao focar
              },
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#d752d2' }, // Cor da borda padrão
              '&:hover fieldset': { borderColor: '#d752d2' }, // Cor da borda ao hover
              '&.Mui-focused fieldset': { borderColor: '#d752d2' }, // Cor da borda ao focar
              '& input::placeholder': { color: '#d752d2' }, // Cor do placeholder
              '& input:focus::placeholder': { color: '#d752d2' }, // Cor do placeholder ao focar
            },
          }}
        >
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Senha"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Link para registro caso o usuário não tenha uma conta */}
          <span>
            Não tem uma conta?
            <Link to="/register" style={{ marginTop: '10px', textDecoration: 'none', color: '#000', fontWeight:"bold", marginLeft:'6px'}}>
              Registre-se
            </Link>
          </span>
          
          {/* Botão de envio do formulário */}
          <Button type="submit" variant="contained" sx={{ mt: 2, bgcolor: '#d752d2', '&:hover': { bgcolor: '#c642c0' }, fontWeight: 'bold' }}>
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
