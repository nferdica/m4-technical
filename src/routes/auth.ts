import { Router } from 'express';
import Admin from '../models/Admin';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = Router();

// Rota para registrar um novo administrador
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body; 
  try {
    const admin = new Admin({ name, email, password });  // Cria um novo admin
    await admin.save();  // Salva o admin no banco de dados
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });  // Gera um token JWT
    res.json({ token });  // Retorna o token gerado
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro ao registrar administrador' });
  }
});

// Rota para login do administrador
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email }); // Busca admin por email
    if (!admin) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    const isMatch = await bcrypt.compare(password, admin.password); // Compara senha
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET!, { expiresIn: '1h' }); // Gera token JWT
    res.status(200).json({ token });  // Retorna o token gerado
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Rota para buscar todos os administradores (retorna apenas nome e email)
router.get('/users', async (req, res) => {
  try {
    const admins = await Admin.find({}, 'name email'); // Busca todos os admins
    res.status(200).json(admins); // Retorna nome e email dos admins
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
});

export default router;
