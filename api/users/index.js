import { connectDB } from '../connect.js';
import User from '../../../backend/models/User.js';

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const { searchParams } = url;
    const filter = {};
    if (searchParams.has('role')) {
      filter.role = searchParams.get('role');
    }
    const users = await User.find(filter, 'name email role').sort({ name: 1 });
    return res.json(users);
  } catch (error) {
    console.error('Users handler error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
