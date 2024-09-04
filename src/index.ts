import dotenv from 'dotenv';
dotenv.config();  // Carrega variáveis de ambiente do arquivo .env
import path from 'path';
import fs from 'fs';

import express from 'express';
import cors from 'cors';
import connectDB from './config/database';  // Conecta ao banco de dados
import authRoutes from './routes/auth';
import influencerRoutes from './routes/influencers';
import brandRoutes from './routes/brands';

const app = express();

// Conectar ao banco de dados
connectDB();

// Permite requisições de outras origens (CORS)
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());  // Faz o parsing de JSON no body das requisições

// Rota para servir imagens estáticas
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Cria a pasta 'uploads' se não existir
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Rotas
app.use('/api/auth', authRoutes);  // Rotas de autenticação
app.use('/api', influencerRoutes);  // Rotas de influenciadores
app.use('/api', brandRoutes);  // Rotas de marcas

// Inicializa o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na PORTA: ${PORT}`);
});


