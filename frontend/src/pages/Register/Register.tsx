import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Importa o toast para mensagens de feedback
import { useNavigate, Link } from 'react-router-dom';
import { Button, Box, TextField, Typography, Container, Paper } from '@mui/material';

const Register = () => {
  const [name, setName] = useState(''); // Estado para armazenar o nome
  const [email, setEmail] = useState(''); // Estado para armazenar o email
  const [password, setPassword] = useState(''); // Estado para armazenar a senha
  const navigate = useNavigate();

  // Função para validar o email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex simples para validar formato de email
    return emailRegex.test(email);
  };

  // Função para validar a senha
  const validatePassword = (password: string) => {
    return password.length >= 6; // A senha precisa ter no mínimo 6 caracteres
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validação do email
    if (!validateEmail(email)) {
      toast.error('Por favor, insira um email válido.');
      return;
    }

    // Validação da senha
    if (!validatePassword(password)) {
      toast.error('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3009/api/auth/register', { name, email, password });
      localStorage.setItem('token', response.data.token); // Armazena o token no localStorage
      toast.success('Usuário registrado com sucesso!'); // Mensagem de sucesso
      navigate('/dashboard'); // Redireciona para o dashboard após sucesso
    } catch (error) {
      toast.error('Erro ao registrar usuário!'); // Mensagem de erro
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, mt: 8, bgcolor: '#FFF' }}>
        {/* Título da página */}
        <Typography component="h1" variant="h5" align="center" gutterBottom color='#000' fontWeight="bold">
          Registrar
        </Typography>

        {/* Formulário de registro */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& .MuiTextField-root': { m: 1, width: '100%' },
            '& .MuiInputLabel-root': {
              color: '#000', fontWeight: 'bold',
              '&.Mui-focused': { color: '#000' },
            },
            '& .MuiInputBase-root': {
              color: '#000', bgcolor: '#ffffff',
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#d752d2' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#d752d2' },
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#d752d2' },
              '&:hover fieldset': { borderColor: '#d752d2' },
              '&.Mui-focused fieldset': { borderColor: '#d752d2' },
              '& input::placeholder': { color: '#d752d2' },
              '& input:focus::placeholder': { color: '#d752d2' },
            },
          }}
        >
          <TextField
            label="Nome"
            variant="outlined"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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

          {/* Link para login caso o usuário já tenha conta */}
          <span>
            Já tem uma conta?
            <Link to="/login" style={{ marginTop: '10px', textDecoration: 'none', color: '#000', fontWeight: 'bold', marginLeft: '6px' }}>
              Faça login
            </Link>
          </span>

          {/* Botão de envio */}
          <Button type="submit" variant="contained" sx={{ mt: 2, bgcolor: '#d752d2', '&:hover': { bgcolor: '#c642c0' }, fontWeight: 'bold' }}>
            Registrar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
