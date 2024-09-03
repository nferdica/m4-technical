import { Router } from 'express';
import Influencer from '../models/Influencer';

const router = Router();

router.post('/influencers', async (req, res) => {
  try {
    const influencer = new Influencer(req.body);  // Cria um novo influenciador com os dados do corpo da requisição.
    await influencer.save();  // Salva o influenciador no banco de dados.
    res.status(201).json(influencer);  // Retorna o influenciador criado.
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar influenciador' });  // Retorna erro em caso de falha.
  }
});

export default router;
