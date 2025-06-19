const mongoose = require('mongoose');   

const CandidateSchema = new mongoose.Schema({
    candidateId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    party: { type: String, required: true },
    votes:{type: Number, default: 0},
    image: { type: String, required: true },
    description: { type: String, required: true },
});

module.exports = mongoose.model('Candidate', CandidateSchema);
