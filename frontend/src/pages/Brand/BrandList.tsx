import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TablePagination,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

const BrandList = () => {
  const [brands, setBrands] = useState([]); // Estado para armazenar as marcas
  const [page, setPage] = useState(0); // Página atual da tabela
  const [rowsPerPage, setRowsPerPage] = useState(12); // Número de itens por página

  // Faz a requisição para buscar todas as marcas quando o componente é montado
  useEffect(() => {
    const fetchBrands = async () => {
      const response = await axios.get('http://localhost:3001/api/brands');
      setBrands(response.data); // Armazena as marcas no estado
    };
    fetchBrands();
  }, []);

  // Lida com a mudança de página
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Lida com a mudança no número de itens por página
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 3, bgcolor: '#FFF' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" component="h1" sx={{ color: '#000', fontWeight: 'bold' }}>
            Marcas
          </Typography>
          {/* Botão para adicionar nova marca */}
          <Button
            component={Link}
            to="/brands/new"
            variant="contained"
            sx={{ bgcolor: '#d752d2', '&:hover': { bgcolor: '#c642c0' }, color: '#FFF', fontWeight: 'bold' }}
            startIcon={<AddIcon />}
          >
            Adicionar Nova Marca
          </Button>
        </Box>

        {/* Lista de marcas paginada */}
        <List>
          {brands
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((brand: any) => (
              <ListItem
                key={brand._id}
                sx={{
                  borderBottom: '1px solid #e0e0e0',
                  bgcolor: '#3f3f56',
                  '& .MuiListItemText-primary': { color: '#FFF' },
                  '& .MuiListItemText-secondary': { color: '#CCC' },
                }}
              >
                <ListItemText
                  primary={brand.name}
                  secondary={brand.niche}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    component={Link}
                    to={`/brands/${brand._id}`}
                    edge="end"
                    aria-label="view"
                    sx={{ color: '#FFF' }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    component={Link}
                    to={`/brands/edit/${brand._id}`}
                    edge="end"
                    aria-label="edit"
                    sx={{ ml: 1, color: '#FFF' }}
                  >
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>

        {/* Paginação da lista */}
        <TablePagination
          component="div"
          count={brands.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[12, 24, 48]}
          labelRowsPerPage="Itens por página"
          sx={{ color: '#000' }}
        />
      </Paper>
    </Container>
  );
};

export default BrandList;

