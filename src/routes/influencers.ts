import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import Influencer from '../models/Influencer';

const router = Router();

const uploadDir = path.resolve(__dirname, '../uploads');

// Configuração do Multer para salvar as imagens no diretório 'uploads/'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Define o nome do arquivo com um timestamp
  },
});

const upload = multer({ storage });

// Rota para criar um influenciador com upload de foto
router.post('/influencers', upload.single('photo'), async (req, res) => {
  try {
    const { name, niche, reach, instagram, address } = req.body;

    // Verifica se há uma foto e salva o caminho da foto no banco de dados
    const photo = req.file ? req.file.filename : '';

    // Certifique-se de que o campo 'address' é um objeto e não tente fazer JSON.parse
    const newInfluencer = new Influencer({
      name,
      niche,
      reach,
      instagram,
      address: typeof address === 'string' ? JSON.parse(address) : address, // Se for string, faça o parse, senão use diretamente
      photo,
    });

    await newInfluencer.save();
    res.status(201).json(newInfluencer);
  } catch (error) {
    console.error('Erro ao criar influenciador:', error);
    res.status(500).json({ message: 'Erro ao cadastrar influenciador' });
  }
});


// Rota para atualizar influenciador com upload de foto
router.put('/influencers/:id', upload.single('photo'), async (req, res) => {
  try {
    const { name, niche, reach, instagram, address } = req.body;
    const photo = req.file ? req.file.filename : undefined;

    // Verifica se o campo 'address' é uma string e tenta fazer o parse para JSON
    let parsedAddress = address;
    if (typeof address === 'string') {
      parsedAddress = JSON.parse(address);
    }

    // Atualiza os dados do influenciador
    const updatedData: { [key: string]: any } = {
      name,
      niche,
      reach: parseInt(reach, 10),
      instagram,
      address: parsedAddress,  // Usa o endereço parseado se necessário
    };

    // Se a foto existir, adiciona ao objeto updatedData
    if (photo) {
      updatedData.photo = photo;
    }

    const influencer = await Influencer.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!influencer) {
      return res.status(404).json({ message: 'Influenciador não encontrado' });
    }
    res.status(200).json(influencer);  // Retorna os dados atualizados
  } catch (error) {
    console.error('Erro ao atualizar influenciador:', error);
    res.status(500).json({ message: 'Erro ao atualizar influenciador' });
  }
});

// Criação de um novo influenciador
router.post('/influencers', async (req, res) => {
  try {
    const influencer = new Influencer(req.body);
    await influencer.save();  // Salva no banco de dados
    res.status(201).json(influencer);  // Retorna o influenciador criado
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar influenciador!' });
  }
});

// Busca todos os influenciadores
router.get('/influencers', async (req, res) => {
  try {
    const influencers = await Influencer.find();
    res.status(200).json(influencers);  // Retorna a lista de influenciadores
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar influenciadores' });
  }
});

// Busca influenciadores com base em parâmetros de busca
router.get('/influencers/search', async (req, res) => {
  try {
    const { niche, minReach, maxReach } = req.query;
    const query: any = {};

    if (niche) query.niche = niche;
    if (minReach) query.reach = { $gte: minReach };
    if (maxReach) query.reach = { ...query.reach, $lte: maxReach };

    const influencers = await Influencer.find(query);  // Busca com base nos filtros
    res.status(200).json(influencers);  // Retorna os influenciadores encontrados
  } catch (error) {
    console.error('Erro ao buscar influenciadores:', error);
    res.status(500).json({ message: 'Erro ao buscar influenciadores' });
  }
});

// Busca influenciador por ID
router.get('/influencers/:id', async (req, res) => {
  try {
    const influencer = await Influencer.findById(req.params.id);
    if (!influencer) {
      return res.status(404).json({ message: 'Influenciador não encontrado!' });
    }
    res.status(200).json(influencer);  // Retorna o influenciador encontrado
  } catch (error) {
    console.error('Erro ao buscar influenciador:', error);
    res.status(500).json({ message: 'Erro ao buscar influenciador' });
  }
});

// Atualiza dados de um influenciador pelo ID
router.put('/influencers/:id', async (req, res) => {
  try {
    const influencer = await Influencer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!influencer) {
      return res.status(404).json({ message: 'Influenciador não encontrado' });
    }
    res.status(200).json(influencer);  // Retorna os dados atualizados
  } catch (error) {
    console.error('Erro ao atualizar influenciador:', error);
    res.status(500).json({ message: 'Erro ao atualizar influenciador' });
  }
});

// Deleta um influenciador pelo ID
router.delete('/influencers/:id', async (req, res) => {
  try {
    const influencer = await Influencer.findByIdAndDelete(req.params.id);
    if (!influencer) {
      return res.status(404).json({ message: 'Influenciador não encontrado' });
    }
    res.status(200).json({ message: 'Influenciador deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar influenciador:', error);
    res.status(500).json({ message: 'Erro ao deletar influenciador' });
  }
});

export default router;
