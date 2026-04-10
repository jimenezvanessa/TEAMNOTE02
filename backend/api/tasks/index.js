const connectDB = require('../../utils/db');
const taskRoutes = require('../../routes/tasks');
const express = require('express');
const cors = require('cors');
const authMiddleware = require('../../middleware/auth');

module.exports = async (req, res) => {
  await connectDB();

  const app = express();
  app.use(express.json({ limit: '10mb' }));
  app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
  }));

  // Apply auth middleware if route requires
  app.use(authMiddleware);
  app.use('/', taskRoutes);

  await new Promise((resolve) => {
    const request = app(req, res);
    request.on('end', resolve);
  });
};

