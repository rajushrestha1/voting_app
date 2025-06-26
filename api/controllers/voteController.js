const Student = require('../models/Student');
const Candidate = require('../models/Candidate');
const Vote = require('../models/Vote');

// Cast a vote
exports.castVote = async (req, res) => {
  const { candidateId } = req.body;
  const { studentId, name } = req.student;
  
  try {
    // Check if student has already voted
    const student = await Student.findOne({ studentId });
    if (student.hasVoted) {
      return res.status(400).json({ message: 'You have already voted' });
    }
    
    // Check candidate exists
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    
    // Record the vote
    const vote = new Vote({
      studentId,
      candidateId
    });
    
    await vote.save();
    
    // Update candidate votes
    candidate.votes += 1;
    await candidate.save();
    
    // Mark student as voted
    student.hasVoted = true;
    await student.save();
    
    res.json({ 
      message: 'Vote cast successfully',
      candidateName: candidate.name
    });
    
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};