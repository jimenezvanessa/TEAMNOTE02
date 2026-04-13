const express = require('express');
const cors = require('cors');
const connectDB = require('../../utils/db');
const authRoutes = require('../../routes/auth');
const taskRoutes = require('../../routes/tasks');
const userRoutes = require('../../routes/users');

module.exports = async (req, res) => {
  // Serverless: Connect DB per request
  await connectDB();

  // Create Express app
  const app = express();
  app.use(express.json({ limit: '10mb' }));
  app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
  }));

  // Routes (match server.js)
  app.use('/auth', authRoutes);
  app.use('/tasks', taskRoutes);
  app.use('/users', userRoutes);

  // Health check
  app.get('/health', (req, res) => res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() }));

  // API 404
  app.use((req, res) => {
    res.status(404).json({ error: 'API endpoint not found' });
  });

  // Socket.io disabled for Vercel serverless (use Upstash Redis or polling)
  // TODO: Replace with HTTP long-polling or external service

  // Execute request
  await new Promise((resolve) => {
    const request = app(req, res);
    request.on('end', resolve);
  });
};
