const express = require('express');
const Task = require('../models/Task');
const { authMiddleware, leaderOnly } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/tasks
// @desc    Get all tasks (filter by status, difficulty)
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { status, difficulty } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (difficulty) filter.difficulty = difficulty;

    const tasks = await Task.find(filter)
      .populate('createdBy', 'name role')
      .sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/tasks
// @desc    Create task
// @access  Private (Leader only)
router.post('/', [authMiddleware, leaderOnly], async (req, res) => {
  const { title, description, difficulty } = req.body;

  try {
    const task = new Task({
      title,
      description,
      difficulty,
      createdBy: req.user.id
    });
    await task.save();

    const populatedTask = await Task.findById(task._id).populate('createdBy', 'name role');
    res.status(201).json(populatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/tasks/:id
// @desc    Update task status etc.
// @access  Private
router.put('/:id', authMiddleware, async (req, res) => {
  const { status } = req.body;
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Anyone can update status (claim to In Progress, Block, Done)
    task.status = status || task.status;
    await task.save();

    const populatedTask = await Task.findById(task._id).populate('createdBy', 'name role');
    res.json(populatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete task
// @access  Private (Leader only)
router.delete('/:id', [authMiddleware, leaderOnly], async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    await task.remove();
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

