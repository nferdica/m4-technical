import { Router } from 'express';
import Admin from '../models/Admin';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;  // Extrai dados do corpo da requisição.
  try {
    const admin = new Admin({ name, email, password });  // Cria um novo administrador.
    await admin.save();  // Salva o administrador no banco de dados.
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });  // Gera um token JWT válido por 1 hora.
    res.json({ token });  // Retorna o token como resposta.
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Erro ao registrar administrador' });  // Retorna erro em caso de falha.
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const admins = await Admin.find({}, 'name email');  // Busca todos os admins, retornando apenas o nome e email
    res.status(200).json(admins);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
});

export default router;
