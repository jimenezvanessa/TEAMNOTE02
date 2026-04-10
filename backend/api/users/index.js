const connectDB = require('../../utils/db');
const express = require('express');
const cors = require('cors');
const userRoutes = require('../../routes/users');

module.exports = async (req, res) => {
  await connectDB();

  const app = express();
  app.use(express.json({ limit: '10mb' }));
  app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
  }));

  app.use('/', userRoutes);

  await new Promise((resolve) => {
    const request = app(req, res);
    request.on('end', resolve);
  });
};

