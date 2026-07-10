require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const attendanceRoutes = require('./routes/attendance');

const app = express();

// Initialize Database connection wrapper
connectDB();

app.use(cors());
app.use(express.json());

// Cleaned up route mappings to use the imported modules safely
app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));