import mongoose from 'mongoose';

const InfluencerSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Nome obrigatório do influenciador
  niche: { type: String, required: true }, // Nicho obrigatório (área de atuação)
  reach: { type: Number, required: true }, // Alcance obrigatório (ex.: número de seguidores)
  instagram: { type: String, required: true }, // Username do Instagram obrigatório
  address: {
    cep: { type: String }, // CEP opcional do influenciador
    street: { type: String }, // Rua opcional
    city: { type: String }, // Cidade opcional
    state: { type: String }, // Estado opcional
  },
  brands: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' }] // Referência às marcas associadas
});

const Influencer = mongoose.model('Influencer', InfluencerSchema); // Criação do modelo Influencer
export default Influencer;
