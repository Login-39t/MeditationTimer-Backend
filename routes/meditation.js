const express = require('express');
const { createSession, getUserSessions, getSessionStats } = require('../controllers/meditationController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/session', protect, createSession);
router.get('/sessions', protect, getUserSessions);
router.get('/stats', protect, getSessionStats);
router.get('/timer', (req, res) => {
  res.json({ message: 'Timer endpoint', status: 'active' });
});

module.exports = router;
