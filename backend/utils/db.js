const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    const message =
      'MONGODB_URI not set. Define it in root .env (local) or Vercel environment variables (production).';
    if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
      throw new Error(message);
    }
    console.warn(message);
    return null;
  }

  try {
    // v4+ driver does not need useNewUrlParser or useUnifiedTopology
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(
      'Database connection error (continuing without DB):',
      error.message
    );
    return null;
  }
};

module.exports = connectDB;