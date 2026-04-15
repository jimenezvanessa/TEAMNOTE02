const express = require('express');
const User = require('../models/User');
const router = express.Router();

// GET /api/users?role=member
router.get('/', async (req, res) => {
  try {
    const { role } = req.query;

    // Validate the role query parameter if provided
    const allowedRoles = ['member', 'admin']; // adjust based on your app
    if (role && !allowedRoles.includes(role)) {
      return res.status(400).json({ error: `Invalid role: ${role}` });
    }

    const filter = role ? { role } : {};

    // Debug log to see what is being queried
    console.log('Fetching users with filter:', filter);

    // Ensure DB is connected before querying
    if (!User.db || User.db.readyState !== 1) { // 1 = connected
      console.error('MongoDB not connected');
      return res.status(500).json({ error: 'Database not connected' });
    }

    const users = await User.find(filter, 'name email role').sort({ name: 1 });

    // Check if result is empty (optional)
    if (!users.length) {
      console.warn('No users found for filter:', filter);
    }

    res.json(users);
  } catch (error) {
    // Log full error for debugging
    console.error('Error fetching users:', error.message);
    console.error(error.stack);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;