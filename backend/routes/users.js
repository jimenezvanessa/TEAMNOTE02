const express = require('express');
const User = require('../models/User');
const router = express.Router();

// @route   GET /api/users
// @desc    Get all users (for login screen list, non-sensitive fields)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { role } = req.query;
    const filter = role ? { role } : {};
    const users = await User.find(filter, 'name email role').sort({ name: 1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

