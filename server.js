const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: ['meditation-timer-jel41b43l-login-ss-projects.vercel.app', 'http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/meditation-app')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Meditation Timer Backend API' });
});

app.get('/api', (req, res) => {
  res.json({ message: 'API is working' });
});

app.get('/timer', (req, res) => {
  res.json({ message: 'Timer endpoint', status: 'active' });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/meditation', require('./routes/meditation'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
