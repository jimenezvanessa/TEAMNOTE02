import { connectDB } from './connect.js';

export default async function handler(req, res) {
  try {
    await connectDB();
    return res.status(200).json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    return res.status(200).json({ 
      status: 'OK - No DB', 
      timestamp: new Date().toISOString(),
      db: 'disconnected'
    });
  }
}
