import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Container, TextField, Button, Box, Typography, Paper, MenuItem } from '@mui/material';

const InfluencerForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [niche, setNiche] = useState<string>('');
  const [reach, setReach] = useState<number>(0);
  const [photoOption, setPhotoOption] = useState<string>('none');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [instagram, setInstagram] = useState<string>('');
  const [cep, setCep] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const navigate = useNavigate();

  // Função para buscar endereço ao digitar o CEP
  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCep(value);
    if (value.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${value}/json/`);
        setStreet(response.data.logradouro);
        setCity(response.data.localidade);
        setState(response.data.uf);
      } catch (error) {
        toast.error("Endereço não encontrado!");
      }
    }
  };

  // Função para lidar com a mudança da imagem selecionada
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]); // Armazena o arquivo selecionado
    }
  };

  // Função para submeter o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('niche', niche);
    formData.append('reach', reach.toString());
    formData.append('instagram', instagram);
    formData.append('address[cep]', cep);
    formData.append('address[street]', street);
    formData.append('address[city]', city);
    formData.append('address[state]', state);

    // Verifica se o usuário selecionou a opção de enviar uma foto
    if (photoOption === 'file' && photoFile) {
      formData.append('photo', photoFile);
    }

    try {
      await axios.post('http://localhost:3001/api/influencers', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Influenciador cadastrado com sucesso!');
      navigate('/influencers');
    } catch (error) {
      toast.error('Erro ao cadastrar influenciador!');
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 3, mt: 8, bgcolor: '#FFF' }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom color='#000' fontWeight="bold">
          Cadastrar Influenciador
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& .MuiTextField-root': { m: 1, width: '100%' },
            '& .MuiInputLabel-root': { color: '#000', fontWeight: 'bold', '&.Mui-focused': { color: '#000' } },
            '& .MuiInputBase-root': {
              color: '#000',
              bgcolor: '#ffffff',
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#d752d2' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#d752d2' },
            },
          }}
        >
          <TextField label="Nome" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} required />
          <TextField label="Nicho" variant="outlined" value={niche} onChange={(e) => setNiche(e.target.value)} required />
          <TextField label="Alcance" variant="outlined" type="number" value={reach} onChange={(e) => setReach(parseInt(e.target.value))} required />

          {/* Seletor para Foto */}
          <TextField
            select
            label="Foto"
            variant="outlined"
            value={photoOption}
            onChange={(e) => setPhotoOption(e.target.value)}
            required
          >
            <MenuItem value="file">Tenho uma foto</MenuItem>
            <MenuItem value="none">Não tenho foto</MenuItem>
          </TextField>

          {/* Campo para upload de arquivo, aparece apenas se a opção for "Enviar arquivo" */}
          {photoOption === 'file' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%'}}>
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handlePhotoChange}
                style={{ padding: '10px', border: '1px solid #d752d2', borderRadius: '4px' }}
              />
            </Box>
          )}

          <TextField label="Instagram" variant="outlined" value={instagram} onChange={(e) => setInstagram(e.target.value)} required />
          <TextField label="CEP" variant="outlined" value={cep} onChange={handleCepChange} required />
          <TextField label="Rua" variant="outlined" value={street} InputProps={{ readOnly: true }} disabled />
          <TextField label="Cidade" variant="outlined" value={city} InputProps={{ readOnly: true }} disabled />
          <TextField label="Estado" variant="outlined" value={state} InputProps={{ readOnly: true }} disabled />

          <Button type="submit" variant="contained" sx={{ mt: 2, bgcolor: '#d752d2', '&:hover': { bgcolor: '#c642c0' }, fontWeight: 'bold' }}>
            Cadastrar Influenciador
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default InfluencerForm;


