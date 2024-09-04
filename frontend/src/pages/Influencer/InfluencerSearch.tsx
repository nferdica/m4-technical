import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Container, TextField, Button, Box, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

const InfluencerSearch = () => {
  const [niche, setNiche] = useState('');  // Estado para armazenar o nicho
  const [minReach, setMinReach] = useState('');  // Estado para armazenar o alcance mínimo
  const [maxReach, setMaxReach] = useState('');  // Estado para armazenar o alcance máximo
  const [results, setResults] = useState([]);  // Estado para armazenar os resultados da busca

  // Função chamada ao submeter o formulário de busca
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Requisição para buscar influenciadores com base nos filtros
      const response = await axios.get('http://localhost:3001/api/influencers/search', {
        params: { niche, minReach, maxReach }
      });
      setResults(response.data);  // Armazena os resultados no estado
    } catch (error) {
      toast.error('Influenciador não encontrado!');  // Exibe mensagem de erro
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 3, bgcolor: '#FFF' }}>
        {/* Título da página */}
        <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ color: '#000', fontWeight: 'bold' }}>
          Buscar Influenciadores
        </Typography>

        {/* Formulário de busca */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& .MuiTextField-root': { m: 1, width: '100%' },
            '& .MuiInputLabel-root': { 
              color: '#000', 
              fontWeight: 'bold', 
              '&.Mui-focused': { color: '#000' },  // Cor da label ao focar
            },
            '& .MuiInputBase-root': {
              color: '#000',  // Cor do texto dos inputs
              bgcolor: '#fff',  // Fundo branco
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
          {/* Campos de texto para filtros de busca */}
          <TextField
            label="Nicho"
            variant="outlined"
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            fullWidth
          />
          <TextField
            label="Alcance Mínimo"
            variant="outlined"
            type="number"
            value={minReach}
            onChange={(e) => setMinReach(e.target.value)}
            fullWidth
          />
          <TextField
            label="Alcance Máximo"
            variant="outlined"
            type="number"
            value={maxReach}
            onChange={(e) => setMaxReach(e.target.value)}
            fullWidth
          />

          {/* Botão de busca */}
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              bgcolor: '#d752d2',
              '&:hover': { bgcolor: '#c642c0' },
              color: '#FFF',
              fontWeight: 'bold'
            }}
          >
            Buscar
          </Button>
        </Box>

        {/* Lista de resultados de influenciadores */}
        {results.length > 0 && (
          <List sx={{ mt: 2, bgcolor: '#3f3f56', borderRadius: 1, p: 2 }}>
            {results.map((influencer: any) => (
              <ListItem key={influencer._id} sx={{ color: '#FFF' }}>
                <ListItemText
                  primary={influencer.name}
                  secondary={`Alcance: ${influencer.reach}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
};

export default InfluencerSearch;
