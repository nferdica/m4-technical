import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Paper, CircularProgress, Grid } from '@mui/material';
import { toast } from 'react-toastify';

const InfluencerDetail = () => {
  const { id } = useParams<{ id: string }>(); // Obtém o ID da URL
  const [influencer, setInfluencer] = useState<any>(null); // Estado para armazenar o influenciador
  const navigate = useNavigate(); // Navegação do React Router

  // Busca os dados do influenciador pelo ID
  useEffect(() => {
    const fetchInfluencer = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/influencers/${id}`); // Chamada à API
        setInfluencer(response.data); // Armazena os dados no estado
      } catch (error) {
        toast.error('Erro ao buscar influenciador!'); // Exibe erro em caso de falha
      }
    };
    fetchInfluencer(); // Executa a busca quando o componente é montado
  }, [id]);

  // Função para deletar o influenciador
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/influencers/${id}`); // Chamada à API para deletar
      toast.success('Influenciador deletado com sucesso!'); // Sucesso
      navigate('/influencers'); // Redireciona para a lista de influenciadores
    } catch (error) {
      toast.error('Erro ao deletar influenciador!'); // Exibe erro em caso de falha
    }
  };

  // Enquanto os dados estão sendo carregados, exibe um indicador de carregamento
  if (!influencer) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {influencer.name}
        </Typography>
        <img src={`http://localhost:3001/uploads/${influencer.photo}`} alt={influencer.name} />
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" gutterBottom><strong>Nicho:</strong> {influencer.niche}</Typography>
          <Typography variant="body1" gutterBottom><strong>Alcance:</strong> {influencer.reach}</Typography>
          <Typography variant="body1" gutterBottom><strong>Instagram:</strong> {influencer.instagram}</Typography>
          <Typography variant="body1" gutterBottom><strong>Endereço:</strong> {influencer.address.street}, {influencer.address.city} - {influencer.address.state}</Typography>
        </Box>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button variant="contained" color="primary" onClick={() => navigate(`/influencers/edit/${influencer._id}`)} sx={{ bgcolor: '#d752d2', '&:hover': { bgcolor: '#c642c0' }, fontWeight: 'bold' }}>
              Editar
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Deletar
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default InfluencerDetail;
