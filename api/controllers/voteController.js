const Student = require('../models/Student');
const Candidate = require('../models/Candidate');

exports.castVote = async (req, res) => {
  const { candidateId, position } = req.body;  // position = 'president', 'VicePresident', or 'Candidates'
  const { studentId } = req.student;

  if (!candidateId) {
    return res.status(400).json({ message: 'candidateId is required' });
  }
  if (!position) {
    return res.status(400).json({ message: 'position is required' });
  }

  try {
    const student = await Student.findOne({ studentId });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    if (student.hasVoted) return res.status(400).json({ message: 'You have already voted' });

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });

    // Increment candidate votes
    candidate.votes = (candidate.votes || 0) + 1;
    await candidate.save();

    // Update student's votedFor field by position
    if (position === 'Candidates') {
      if (!student.votedFor.Candidates) student.votedFor.Candidates = [];
      student.votedFor.Candidates.push(candidateId);
    } else if (position === 'president') {
      student.votedFor.president = candidateId;
    } else if (position === 'VicePresident') {
      student.votedFor.VicePresident = candidateId;
    } else {
      return res.status(400).json({ message: 'Invalid position' });
    }

    // Mark student as voted if all votes done (you can adjust this logic)
    // For example, if all three positions voted:
    // (You may want to handle this per your frontend flow)
    if (
      student.votedFor.president &&
      student.votedFor.VicePresident &&
      student.votedFor.Candidates &&
      student.votedFor.Candidates.length > 0
    ) {
      student.hasVoted = true;
    }

    await student.save();

    return res.json({ message: `Vote cast successfully for ${candidate.name}` });
  } catch (error) {
    console.error('[castVote] Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
