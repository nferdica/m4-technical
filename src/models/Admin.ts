import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Definição do esquema Admin
const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Nome obrigatório
  email: { type: String, required: true, unique: true }, // Email único e obrigatório
  password: { type: String, required: true }, // Senha obrigatória
});

// Middleware para hashear a senha antes de salvar
AdminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next(); // Se a senha não foi modificada, continua o fluxo
  }
  const salt = await bcrypt.genSalt(10); // Gera o salt
  this.password = await bcrypt.hash(this.password, salt); // Hashea a senha
});

// Cria o modelo Admin com o esquema definido
const Admin = mongoose.model('Admin', AdminSchema);

export default Admin;
