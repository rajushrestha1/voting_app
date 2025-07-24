const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
   name: { type: String, required: true },
  party: { type: String, required: true },
  position: { type: String, enum: ['President', 'Vice President', 'Candidate'], required: true },
  votes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
image: { type: String, required: true } });

module.exports = mongoose.model('Candidate', CandidateSchema);
