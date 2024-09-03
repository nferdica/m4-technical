import mongoose from 'mongoose';

const InfluencerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  niche: { type: String, required: true },
  reach: { type: Number, required: true },
  instagram: { type: String, required: true },
  address: {
    cep: { type: String },
    street: { type: String },
    city: { type: String },
    state: { type: String },
  },
});

const Influencer = mongoose.model('Influencer', InfluencerSchema);
export default Influencer;
