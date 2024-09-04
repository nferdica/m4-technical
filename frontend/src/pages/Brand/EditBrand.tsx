import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Box, Typography, Paper } from '@mui/material';
import { toast } from 'react-toastify';

const EditBrand = () => {
  const { id } = useParams<{ id: string }>(); // Obtém o ID da URL
  const [name, setName] = useState(''); // Estado para armazenar o nome da marca
  const [description, setDescription] = useState(''); // Estado para armazenar a descrição da marca
  const [niche, setNiche] = useState(''); // Estado para armazenar o nicho da marca
  const navigate = useNavigate();

  // Busca os dados da marca ao carregar a página
  useEffect(() => {
    const fetchBrand = async () => {
      const response = await axios.get(`http://localhost:3009/api/brands/${id}`);
      const { name, description, niche } = response.data;
      setName(name);
      setDescription(description);
      setNiche(niche);
    };
    fetchBrand();
  }, [id]);

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedBrand = { name, description, niche }; // Dados atualizados da marca
      await axios.put(`http://localhost:3009/api/brands/${id}`, updatedBrand); // Atualiza a marca no backend
      toast.success('Marca atualizada com sucesso!');
      navigate('/brands'); // Redireciona para a lista de marcas
    } catch (error) {
      toast.error('Erro ao atualizar marca!'); // Exibe mensagem de erro
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 3, mt: 8, bgcolor: '#FFF' }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom color='#000' fontWeight="bold">
          Editar Marca
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& .MuiTextField-root': { m: 1, width: '100%' },
            '& .MuiInputLabel-root': { color: '#000', fontWeight: 'bold', 
              '&.Mui-focused': {
                color: '#000',  // Cor da label ao focar
              },
            },
            '& .MuiInputBase-root': {
              color: '#000',
              bgcolor: '#ffffff',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d752d2',  // Cor da borda ao hover
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d752d2',  // Cor da borda ao focar
              },
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#d752d2',  // Cor da borda
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
          {/* Campos de edição */}
          <TextField
            label="Nome"
            variant="outlined"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Descrição"
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <TextField
            label="Nicho"
            variant="outlined"
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            required
          />
          {/* Botão de atualização */}
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, bgcolor: '#d752d2', '&:hover': { bgcolor: '#c642c0' }, fontWeight: 'bold' }}>
            Atualizar Marca
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditBrand;
