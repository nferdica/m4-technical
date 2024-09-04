import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!); // Conecta ao banco de dados usando a URL fornecida no .env
    console.log('banco de dados inicializado com sucesso!');
  } catch (err) {
    console.error(err); // Loga o erro caso a conexão falhe
    process.exit(1); // Encerra o processo com falha caso ocorra erro na conexão
  }
};

export default connectDB;

