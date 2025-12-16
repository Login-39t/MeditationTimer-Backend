const MeditationSession = require('../models/MeditationSession');
const mongoose = require('mongoose');

const createSession = async (req, res) => {
  try {
    const { duration, type } = req.body;
    
    const session = await MeditationSession.create({
      user: req.user.id,
      duration,
      type
    });

    res.status(201).json(session);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserSessions = async (req, res) => {
  try {
    const sessions = await MeditationSession.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    
    res.json(sessions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSessionStats = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const totalSessions = await MeditationSession.countDocuments({ user: userId });
    const totalMinutes = await MeditationSession.aggregate([
      { $match: { user: userId } },
      { $group: { _id: null, total: { $sum: '$duration' } } }
    ]);

    res.json({
      totalSessions,
      totalMinutes: totalMinutes[0]?.total || 0
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createSession, getUserSessions, getSessionStats };