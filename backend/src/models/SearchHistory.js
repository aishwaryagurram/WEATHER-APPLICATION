const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema({
  query: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['city', 'coordinates', 'zip'],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    default: 'anonymous', // In a real app, this would be linked to user authentication
  }
});

module.exports = mongoose.model('SearchHistory', searchHistorySchema);
