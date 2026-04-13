const dbConnect = require('../lib/db');
const User = require('../lib/models/User');

module.exports = async (req, res) => {
  await dbConnect();

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const { role } = req.query;
      const filter = role ? { role } : {};
      const users = await User.find(filter, 'name email role').sort({ name: 1 });
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
    }
  }

  res.status(405).json({ message: 'Method not allowed' });
};
