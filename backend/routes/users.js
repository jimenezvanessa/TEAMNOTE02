const express = require('express');
const User = require('../models/User');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/users
// @desc    Get users (filter by role)
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { role } = req.query;
    const allowedRoles = ['leader', 'member'];
    const filter = allowedRoles.includes(role) ? { role } : {};
    const users = await User.find(filter).select('name email role');
    res.json(users);
  } catch (err) {
    console.error('Users error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
