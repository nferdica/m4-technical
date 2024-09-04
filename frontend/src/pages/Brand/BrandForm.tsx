import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Box, Typography, Paper } from '@mui/material';
import { toast } from 'react-toastify';

const BrandForm = () => {
  const [name, setName] = useState(''); // Estado para o nome da marca
  const [description, setDescription] = useState(''); // Estado para a descrição da marca
  const [niche, setNiche] = useState(''); // Estado para o nicho da marca
  const navigate = useNavigate();

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newBrand = { name, description, niche };
      await axios.post('http://localhost:3009/api/brands', newBrand); // Envia os dados para o backend
      toast.success('Marca cadastrada com sucesso!'); // Exibe mensagem de sucesso
      navigate('/brands'); // Redireciona para a lista de marcas após o cadastro
    } catch (error) {
      toast.error('Erro ao cadastrar marca!'); // Exibe mensagem de erro em caso de falha
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 3, mt: 8, bgcolor: '#FFF'  }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom color='#000' fontWeight="bold">
          Cadastrar Marca
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& .MuiTextField-root': { m: 1, width: '100%' }, // Estilização dos campos de texto
            '& .MuiInputLabel-root': { color: '#000', fontWeight: 'bold', 
              '&.Mui-focused': {
                color: '#000',  // Cor da label ao focar
              },
            },  // Estilização das labels
            '& .MuiInputBase-root': {
              color: '#000',  // Cor do texto dos inputs
              bgcolor: '#ffffff',  // Fundo branco dos inputs
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d752d2',  // Cor da borda ao hover
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d752d2',  // Cor da borda ao focar
              },
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#d752d2',  // Cor da borda padrão
              },
              '&:hover fieldset': {
                borderColor: '#d752d2',  // Cor da borda ao hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#d752d2',  // Cor da borda ao focar
              },
              '& input::placeholder': {
                color: '#d752d2',  // Cor do placeholder
              },
              '& input:focus::placeholder': {
                color: '#d752d2',  // Cor do placeholder ao focar
              },
            },
          }}
        >
          {/* Campo para o nome da marca */}
          <TextField
            label="Nome"
            variant="outlined"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          
          {/* Campo para a descrição da marca */}
          <TextField
            label="Descrição"
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          
          {/* Campo para o nicho da marca */}
          <TextField
            label="Nicho"
            variant="outlined"
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            required
          />
          
          {/* Botão de submissão do formulário */}
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, bgcolor: '#d752d2', '&:hover': { bgcolor: '#c642c0' }, fontWeight: 'bold' }}>
            Cadastrar Marca
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default BrandForm;

