const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'temporary_secret_key_for_local_testing';
}

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', require('./routes/quizRoutes'));
app.use('/api/results', require('./routes/resultRoutes'));

const PORT = process.env.PORT || 5000;

// Basic route for testing
app.get('/', (req, res) => {
  res.send('SmartQuiz API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
