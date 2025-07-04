const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  name: String,
  party: String,
  votes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Candidate', CandidateSchema);
