const dbConnect = require('../lib/db');
const Task = require('../lib/models/Task');
const jwt = require('jsonwebtoken');
const User = require('../lib/models/User');

// Auth middleware
const authMiddleware = async (token) => {
  if (!token) {
    throw new Error('No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

const leaderOnly = (user) => {
  if (user.role !== 'leader') {
    throw new Error('Leader access required');
  }
};

module.exports = async (req, res) => {
  await dbConnect();

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const token = req.headers.authorization?.replace('Bearer ', '');

  try {
    if (req.method === 'GET') {
      const user = await authMiddleware(token);
      const { status, difficulty } = req.query;
      const filter = {};
      if (status) filter.status = status;
      if (difficulty) filter.difficulty = difficulty;

      const tasks = await Task.find(filter)
        .populate('createdBy', 'name role')
        .sort({ createdAt: -1 });
      return res.status(200).json(tasks);
    } else if (req.method === 'POST') {
      const user = await authMiddleware(token);
      leaderOnly(user);

      const { title, description, difficulty } = req.body;
      const task = new Task({
        title,
        description,
        difficulty,
        createdBy: user.id,
      });
      await task.save();

      const populatedTask = await Task.findById(task._id).populate('createdBy', 'name role');
      return res.status(201).json(populatedTask);
    } else if (req.method === 'PUT') {
      const user = await authMiddleware(token);
      const taskId = req.url.split('/').pop();
      const { status } = req.body;

      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      task.status = status || task.status;
      await task.save();

      const populatedTask = await Task.findById(task._id).populate('createdBy', 'name role');
      return res.status(200).json(populatedTask);
    } else if (req.method === 'DELETE') {
      const user = await authMiddleware(token);
      leaderOnly(user);

      const taskId = req.url.split('/').pop();
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      await task.deleteOne();
      return res.status(200).json({ message: 'Task deleted' });
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    if (error.message.includes('token') || error.message.includes('Token')) {
      return res.status(401).json({ error: error.message });
    }
    if (error.message.includes('Leader')) {
      return res.status(403).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Server error' });
  }
};
