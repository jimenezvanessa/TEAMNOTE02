const connectDB = require('../../utils/db');
const authRoutes = require('../../routes/auth');
const express = require('express');
const cors = require('cors');
const authMiddleware = require('../../middleware/auth');

module.exports = async (req, res) => {
  // Serverless: Connect DB per request
  await connectDB();

  // Create mini Express app for routes
  const app = express();
  app.use(express.json({ limit: '10mb' }));
  app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
  }));

  // Mount routes
  app.use('/', authRoutes);

  // Handle auth middleware routes separately if needed
  // app.use(authMiddleware, protectedRoutes);

  // Execute the request through Express
  await new Promise((resolve) => {
    const request = app(req, res);
    request.on('end', resolve);
  });
};

