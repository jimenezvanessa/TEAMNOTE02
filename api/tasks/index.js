import { connectDB } from '../connect.js';
import Task from '../../../backend/models/Task.js';
import User from '../../../backend/models/User.js';
import jwt from 'jsonwebtoken';

const authMiddleware = async (req) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) throw new Error('No token, authorization denied');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) throw new Error('Token is not valid');
    return user;
  } catch (error) {
    throw new Error('Token is not valid');
  }
};

const leaderOnly = (user) => {
  if (user.role !== 'leader') throw new Error('Leader access required');
};

export default async function handler(req, res) {
  await connectDB();

  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;
  const { searchParams } = url;

  try {
    const user = await authMiddleware(req);

    if (req.method === 'GET') {
      if (path === '/tasks/my') {
        const tasks = await Task.find({ createdBy: user.id }).populate('createdBy', 'name role').sort({ createdAt: -1 });
        return res.json(tasks);
      }
      
      if (path === '/tasks') {
        const filter = {};
        if (searchParams.has('status')) filter.status = searchParams.get('status');
        if (searchParams.has('difficulty')) filter.difficulty = searchParams.get('difficulty');
        const tasks = await Task.find(filter).populate('createdBy', 'name role').sort({ createdAt: -1 });
        return res.json(tasks);
      }
    }

    if (req.method === 'POST' && path === '/tasks') {
      leaderOnly(user);
      const { title, description, difficulty } = req.body;
      const task = new Task({ title, description, difficulty, createdBy: user.id });
      await task.save();
      const populatedTask = await Task.findById(task._id).populate('createdBy', 'name role');
      return res.status(201).json(populatedTask);
    }

    if (req.method === 'PUT') {
      const id = path.split('/').pop();
      const { status } = req.body;
      const task = await Task.findById(id);
      if (!task) return res.status(404).json({ error: 'Task not found' });
      task.status = status || task.status;
      await task.save();
      const populatedTask = await Task.findById(task._id).populate('createdBy', 'name role');
      return res.json(populatedTask);
    }

    if (req.method === 'DELETE') {
      leaderOnly(user);
      const id = path.split('/').pop();
      const task = await Task.findById(id);
      if (!task) return res.status(404).json({ error: 'Task not found' });
      await task.remove();
      return res.json({ message: 'Task deleted' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    if (error.message.includes('token') || error.message.includes('No token')) {
      return res.status(401).json({ error: error.message });
    }
    if (error.message.includes('Leader access')) {
      return res.status(403).json({ error: error.message });
    }
    console.error('Tasks handler error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
