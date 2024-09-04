import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Paper, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';

const BrandDetail = () => {
  const { id } = useParams<{ id: string }>(); // Extrai o ID da marca da URL
  const [brand, setBrand] = useState<any>(null); // Armazena os detalhes da marca
  const navigate = useNavigate();

  // Busca detalhes da marca ao montar o componente
  useEffect(() => {
    const fetchBrand = async () => {
      const response = await axios.get(`http://localhost:3001/api/brands/${id}`);
      setBrand(response.data); // Armazena os detalhes da marca
    };
    fetchBrand();
  }, [id]);

  // Função para desassociar um influenciador da marca
  const handleDisassociate = async (influencerId: string) => {
    try {
      await axios.post(`http://localhost:3001/api/brands/${id}/disassociate-influencer`, {
        influencerId,
      });
      toast.success('Influenciador desassociado da marca com sucesso!'); // Mensagem de sucesso
      // Remove o influenciador da lista de influenciadores da marca
      setBrand({
        ...brand,
        influencers: brand.influencers.filter(
          (influencer: any) => influencer._id !== influencerId
        ),
      });
    } catch (error) {
      toast.error('Erro ao desassociar influenciador!'); // Mensagem de erro
    }
  };

  // Exibe um indicador de carregamento enquanto os dados são buscados
  if (!brand) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {brand.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Descrição:</strong> {brand.description}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Nicho:</strong> {brand.niche}
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 3 }}>
          Influenciadores Associados
        </Typography>
        <List>
          {brand.influencers.map((influencer: any) => (
            <ListItem
              key={influencer._id}
              sx={{
                borderBottom: '1px solid #e0e0e0',
                '&:last-child': { borderBottom: 'none' },
              }}
            >
              <ListItemText primary={influencer.name} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="disassociate"
                  color="error"
                  onClick={() => handleDisassociate(influencer._id)} // Função para desassociar influenciador
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <Box display="flex" justifyContent="flex-end" mt={3}>
          {/* Botão para editar a marca */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/brands/edit/${brand._id}`)} // Redireciona para a página de edição da marca
            sx={{bgcolor: '#d752d2', '&:hover': { bgcolor: '#c642c0' }, fontWeight: 'bold' }}
          >
            Editar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default BrandDetail;

