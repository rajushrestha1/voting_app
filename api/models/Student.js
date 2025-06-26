const mongoose = require('mongoose');

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
  }
});

module.exports = mongoose.model('Student', StudentSchema);