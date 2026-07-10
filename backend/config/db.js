const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Uses your Cloud Mongo Atlas URI if available, otherwise defaults to local for safety
    const connString = process.env.MONGO_URI || 'mongodb://localhost:27017/abccollege';
    
    await mongoose.connect(connString);
    console.log('MongoDB Connected successfully');
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;