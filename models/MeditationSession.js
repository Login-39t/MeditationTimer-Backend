const mongoose = require('mongoose');

const meditationSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['breathing', 'mindfulness', 'body-scan', 'loving-kindness'],
    default: 'mindfulness'
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('MeditationSession', meditationSessionSchema);