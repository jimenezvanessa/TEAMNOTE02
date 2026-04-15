const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.warn(
      'MONGODB_URI not set - running without database (in-memory operations limited)'
    );
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