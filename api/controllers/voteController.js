// controllers/voteController.js
const Student = require('../models/Student');
const Candidate = require('../models/Candidate');

exports.castVote = async (req, res) => {
  const { candidateId, position } = req.body;
  const { studentId } = req.student;

  if (!candidateId || !position) {
    return res.status(400).json({ message: 'candidateId and position are required' });
  }

  try {
    const student = await Student.findOne({ studentId });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });

    if (!student.votedFor) student.votedFor = {};

    // Handle vote logic by position
    if (position === 'president') {
      if (student.votedFor.president) {
        return res.status(400).json({ message: 'Already voted for President' });
      }
      student.votedFor.president = candidateId;
    } else if (position === 'VicePresident') {
      if (student.votedFor.VicePresident) {
        return res.status(400).json({ message: 'Already voted for Vice President' });
      }
      student.votedFor.VicePresident = candidateId;
    } else if (position === 'Candidates') {
      if (!Array.isArray(student.votedFor.Candidates)) {
        student.votedFor.Candidates = [];
      }
      if (student.votedFor.Candidates.includes(candidateId)) {
        return res.status(400).json({ message: 'Already voted for this candidate' });
      }
      if (student.votedFor.Candidates.length >= 5) {
        return res.status(400).json({ message: 'Can vote for up to 5 candidates only' });
      }
      student.votedFor.Candidates.push(candidateId);
    } else {
      return res.status(400).json({ message: 'Invalid position' });
    }

    candidate.votes = (candidate.votes || 0) + 1;
    await candidate.save();

    // Mark complete voting
    if (
      student.votedFor.president &&
      student.votedFor.VicePresident &&
      Array.isArray(student.votedFor.Candidates) &&
      student.votedFor.Candidates.length === 5
    ) {
      student.hasVoted = true;
    }

    await student.save();

    return res.status(200).json({ message: `Successfully voted for ${candidate.name}`, student });
  } catch (error) {
    console.error('[castVote] Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
