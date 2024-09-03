import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log('banco de dados inicializado com sucesso!');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
