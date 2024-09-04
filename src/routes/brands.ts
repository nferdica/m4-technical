import { Router } from 'express';
import mongoose from 'mongoose';
import Brand from '../models/Brand'; 
import Influencer from '../models/Influencer';

const router = Router();

// Rota para cadastrar uma nova marca
router.post('/brands', async (req, res) => {
  try {
    const brand = new Brand(req.body); 
    await brand.save(); // Salva a nova marca no banco de dados
    res.status(201).json(brand); // Retorna a marca criada
  } catch (error) {
    console.error('Erro ao cadastrar marca:', error);
    res.status(500).json({ message: 'Erro ao cadastrar marca' });
  }
});

// Atualiza os dados de uma marca existente
router.put('/brands/:id', async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!brand) {
      return res.status(404).json({ message: 'Marca não encontrada' });
    }
    res.status(200).json(brand); // Retorna os dados atualizados da marca
  } catch (error) {
    console.error('Erro ao atualizar marca:', error);
    res.status(500).json({ message: 'Erro ao atualizar marca' });
  }
});

// Busca todas as marcas
router.get('/brands', async (req, res) => {
  try {
    const brands = await Brand.find(); // Busca todas as marcas no banco de dados
    res.status(200).json(brands); 
  } catch (error) {
    console.error('Erro ao buscar marcas:', error);
    res.status(500).json({ message: 'Erro ao buscar marcas' });
  }
});

// Busca uma marca pelo ID e popula influenciadores associados
router.get('/brands/:id', async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id).populate('influencers'); 
    if (!brand) {
      return res.status(404).json({ message: 'Marca não encontrada' });
    }
    res.status(200).json(brand); 
  } catch (error) {
    console.error('Erro ao buscar marca:', error);
    res.status(500).json({ message: 'Erro ao buscar marca' });
  }
});

// Associa um influenciador a uma marca
router.post('/brands/:id/associate-influencer', async (req, res) => {
  try {
    const { id } = req.params;
    const { influencerId } = req.body;

    const brand = await Brand.findById(id);
    const influencer = await Influencer.findById(influencerId);

    if (!brand || !influencer) {
      return res.status(404).json({ message: 'Marca ou influenciador não encontrado' });
    }

    // Verifica se o influenciador já está associado
    if (brand.influencers.includes(influencerId)) {
      return res.status(400).json({ message: 'Influenciador já está associado a esta marca' });
    }

    // Adiciona a associação
    brand.influencers.push(new mongoose.Types.ObjectId(influencerId));
    influencer.brands.push(new mongoose.Types.ObjectId(id));

    await brand.save();
    await influencer.save();

    res.status(200).json({ message: 'Influenciador associado à marca com sucesso' });
  } catch (error) {
    console.error('Erro ao associar influenciador à marca:', error);
    res.status(500).json({ message: 'Erro ao associar influenciador à marca' });
  }
});

// Desassocia um influenciador de uma marca
router.post('/brands/:id/disassociate-influencer', async (req, res) => {
  try {
    const { id } = req.params;
    const { influencerId } = req.body;

    const brand = await Brand.findById(id);
    const influencer = await Influencer.findById(influencerId);

    if (!brand || !influencer) {
      return res.status(404).json({ message: 'Marca ou influenciador não encontrado' });
    }

    // Remove o influenciador da marca
    brand.influencers = brand.influencers.filter((infId: mongoose.Types.ObjectId) => !infId.equals(influencer._id));

    // Remove a marca do influenciador
    influencer.brands = influencer.brands.filter((brandId: mongoose.Types.ObjectId) => !brandId.equals(brand._id));

    await brand.save();
    await influencer.save();

    res.status(200).json({ message: 'Influenciador desassociado da marca com sucesso' });
  } catch (error) {
    console.error('Erro ao desassociar influenciador da marca:', error);
    res.status(500).json({ message: 'Erro ao desassociar influenciador da marca' });
  }
});

export default router;
