const mongoose = require('mongoose');
const Candidate = require('./Candidate');

const StudentSchema = new mongoose.Schema({
  studentId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  hasVoted: {
    type: Boolean,
    default: false
  },
  votedFor: {
    president: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate'
    },
    VicePresident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate'
    },
    Candidates: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate'
    }]
  }
});

module.exports = mongoose.model('Student', StudentSchema);