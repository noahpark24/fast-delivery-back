import mongoose from 'mongoose';
import dotenv from 'dotenv'; //el dotenv es para la variable del .env de la url
dotenv.config();
const URL: string = process.env.URL || '';

const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log('DB is connected');
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
};
export default connectDB;
