const mongoose = require('mongoose');
const VoteSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true },
    name:{type: String, required: true},
    candidateId:{type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true},
    hasVoted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Vote', VoteSchema);
