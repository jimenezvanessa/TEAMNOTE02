const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');

const test = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connection successful:', conn.connection.host);
    await mongoose.disconnect();
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
  }
};

test();