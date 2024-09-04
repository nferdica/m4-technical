import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Button, MenuItem, TextField, Typography, Paper } from '@mui/material';

const AssociateInfluencer = () => {
  const [influencers, setInfluencers] = useState<any[]>([]); // Armazena a lista de influenciadores
  const [brands, setBrands] = useState<any[]>([]); // Armazena a lista de marcas
  const [selectedInfluencer, setSelectedInfluencer] = useState(''); // Armazena o influenciador selecionado
  const [selectedBrand, setSelectedBrand] = useState(''); // Armazena a marca selecionada
  const navigate = useNavigate();

  // Busca os influenciadores e marcas ao montar o componente
  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/influencers'); // Busca os influenciadores
        setInfluencers(response.data);
      } catch (error) {
        toast.error('Erro ao buscar influenciadores!');
      }
    };

    const fetchBrands = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/brands'); // Busca as marcas
        setBrands(response.data);
      } catch (error) {
        toast.error('Erro ao buscar marcas!');
      }
    };

    fetchInfluencers();
    fetchBrands();
  }, []);

  // Função para enviar os dados ao backend e associar o influenciador à marca
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3001/api/brands/${selectedBrand}/associate-influencer`, {
        influencerId: selectedInfluencer,
      });
      toast.success('Influenciador associado à marca com sucesso!');
      navigate('/dashboard'); // Redireciona para o dashboard
    } catch (error) {
      toast.error('Erro ao associar influenciador à marca!');
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 3, mt: 8, bgcolor: '#FFF' }}>
        <Typography variant="h5" component="h1" gutterBottom align="center" color='#000' fontWeight="bold">
          Associar Influenciador a Marca
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
                borderColor: '#d752d2',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d752d2',
              },
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#d752d2',
              },
              '&:hover fieldset': {
                borderColor: '#d752d2',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#d752d2',
              },
              '& input::placeholder': {
                color: '#d752d2',
              },
              '& input:focus::placeholder': {
                color: '#d752d2',
              },
            },
          }}
        >
          <TextField
            select
            label="Selecione uma Marca"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            required
          >
            <MenuItem value="">Selecione</MenuItem>
            {brands.map((brand: any) => (
              <MenuItem key={brand._id} value={brand._id}>
                {brand.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Selecione um Influenciador"
            value={selectedInfluencer}
            onChange={(e) => setSelectedInfluencer(e.target.value)}
            required
          >
            <MenuItem value="">Selecione</MenuItem>
            {influencers.map((influencer: any) => (
              <MenuItem key={influencer._id} value={influencer._id}>
                {influencer.name}
              </MenuItem>
            ))}
          </TextField>

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, bgcolor: '#d752d2', '&:hover': { bgcolor: '#c642c0' }, fontWeight: 'bold' }}>
            Associar Influenciador
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AssociateInfluencer;

