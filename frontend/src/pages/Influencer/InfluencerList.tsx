import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Box,
  IconButton,
  Paper,
  TablePagination,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';

const InfluencerList = () => {
  const [influencers, setInfluencers] = useState([]); // Armazena a lista de influenciadores
  const [page, setPage] = useState(0); // Armazena a página atual para paginação
  const [rowsPerPage, setRowsPerPage] = useState(12); // Armazena o número de itens por página

  // Faz a requisição para buscar todos os influenciadores ao carregar a página
  useEffect(() => {
    const fetchInfluencers = async () => {
      const response = await axios.get('http://localhost:3001/api/influencers');
      setInfluencers(response.data); // Atualiza a lista de influenciadores
    };
    fetchInfluencers();
  }, []);

  // Atualiza a página atual ao mudar de página
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Atualiza o número de itens por página
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 3, bgcolor: '#FFF', color: '#FFF' }}>
        {/* Cabeçalho da lista de influenciadores */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" component="h1" sx={{ color: '#000', fontWeight: 'bold' }}>
            Influenciadores
          </Typography>
          <Button
            component={Link}
            to="/influencers/new"
            variant="contained"
            sx={{ bgcolor: '#d752d2', '&:hover': { bgcolor: '#c642c0' }, color: '#FFF', fontWeight: 'bold' }}
            startIcon={<AddIcon />}
          >
            Cadastrar Influenciador
          </Button>
        </Box>

        {/* Tabela com a lista de influenciadores */}
        <TableContainer component={Paper} sx={{ bgcolor: '#3f3f56' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#FFF', fontWeight: 'bold' }}>#</TableCell>
                <TableCell sx={{ color: '#FFF', fontWeight: 'bold' }}>Username</TableCell>
                <TableCell sx={{ color: '#FFF', fontWeight: 'bold' }}>Nome</TableCell>
                <TableCell sx={{ color: '#FFF', fontWeight: 'bold' }}>CEP</TableCell>
                <TableCell sx={{ color: '#FFF', fontWeight: 'bold' }} align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Exibe a lista paginada de influenciadores */}
              {influencers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((influencer: any, index: number) => (
                  <TableRow key={influencer._id}>
                    <TableCell sx={{ color: '#FFF' }}>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell sx={{ color: '#FFF' }}>{influencer.instagram}</TableCell>
                    <TableCell sx={{ color: '#FFF' }}>{influencer.name}</TableCell>
                    <TableCell sx={{ color: '#FFF' }}>{influencer.address?.cep || 'N/A'}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={Link}
                        to={`/influencers/edit/${influencer._id}`}
                        aria-label="edit"
                        sx={{ color: '#FFF' }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        component={Link}
                        to={`/influencers/${influencer._id}`}
                        aria-label="view"
                        sx={{ ml: 1, color: '#FFF' }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Paginação da tabela */}
        <TablePagination
          component="div"
          count={influencers.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[12, 24, 48]} // Opções de itens por página
          labelRowsPerPage="Itens por página"
          sx={{ color: '#000' }}
        />
      </Paper>
    </Container>
  );
};

export default InfluencerList;

