const Student = require('../models/Student');
const jwt = require('jsonwebtoken');

// Student login
exports.studentLogin = async (req, res) => {
  const { studentId } = req.body;
  
  try {
    const student = await Student.findOne({ studentId });
    
    if (!student) {
      return res.status(401).json({ message: 'Invalid Student ID' });
    }
    
    const token = jwt.sign(
      { studentId: student.studentId, name: student.name },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.cookie('studentToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000,
    });
    
    res.json({ 
      message: 'Login successful',
      name: student.name,
      studentId: student.studentId
    });
    
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Student logout
exports.studentLogout = (req, res) => {
  res.clearCookie('studentToken');
  res.json({ message: 'Logged out successfully' });
};