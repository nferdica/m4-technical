import mongoose from 'mongoose';

const BrandSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Nome obrigatório da marca
  description: { type: String, required: true }, // Descrição obrigatória da marca
  niche: { type: String, required: true }, // Nicho obrigatório da marca
  influencers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Influencer' }] // Referência aos influenciadores associados
});

const Brand = mongoose.model('Brand', BrandSchema); // Cria o modelo Brand com o esquema definido

export default Brand;
