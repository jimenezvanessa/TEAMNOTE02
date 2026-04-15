import { connectDB } from '../connect.js';
import User from '../../../backend/models/User.js';
import jwt from 'jsonwebtoken';

const authMiddleware = async (req) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    throw new Error('No token, authorization denied');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      throw new Error('Token is not valid');
    }
    return user;
  } catch (error) {
    throw new Error('Token is not valid');
  }
};

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;

  try {
    if (path === '/auth/register') {
      const { name, email, password, role } = req.body;
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ error: 'User already exists' });
      }
      user = new User({ name, email, password, role: role || 'member' });
      await user.save();
      const payload = { id: user.id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(201).json({ 
        token, 
        user: { id: user.id, name: user.name, email: user.email, role: user.role } 
      });
    }

    if (path === '/auth/login') {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
      const payload = { id: user.id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ 
        token, 
        user: { id: user.id, name: user.name, email: user.email, role: user.role } 
      });
    }

    return res.status(404).json({ error: 'Route not found' });
  } catch (error) {
    console.error('Auth handler error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
