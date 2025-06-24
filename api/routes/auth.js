const express = require('express');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');

const router = express.Router();

router.post('/login', async (req, res) => {
  let { studentId } = req.body;
  
  console.log('[AUTH] Student login attempt');
  console.log(`[AUTH] Received studentId: ${studentId}`);
  
  if (!studentId) {
    console.log('[AUTH] Missing studentId');
    return res.status(400).json({ message: 'Student ID is required' });
  }

  // Normalize studentId - Remove spaces and convert to uppercase
  studentId = studentId.toString().replace(/\s+/g, '').toUpperCase();
  console.log(`[AUTH] Normalized studentId: ${studentId}`);

  try {
    console.log(`[AUTH] Searching for student: ${studentId}`);
    
    // Use findOne with exact match
    const student = await Student.findOne({ studentId });
    
    if (!student) {
      console.log(`[AUTH] Student not found: ${studentId}`);
      
      // Debugging: List all student IDs in the database
      const allStudents = await Student.find({}, 'studentId');
      console.log('[AUTH] All student IDs in DB:', allStudents.map(s => s.studentId));
      
      return res.status(401).json({ message: 'Invalid Student ID' });
    }

    console.log(`[AUTH] Student found: ${student.name}`);
    
    // JWT creation
    const payload = { 
      studentId: student.studentId,
      name: student.name
    };
    
    console.log('[AUTH] Creating JWT with payload:', payload);
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log('[AUTH] Setting cookie...');
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000,
    });

    console.log('[AUTH] Login successful');
    res.json({ 
      message: 'Login successful',
      name: student.name,
      studentId: student.studentId
    });
  } catch (err) {
    console.error('[AUTH] Server error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/logout', (req, res) => {
  console.log('[AUTH] Logout request');
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;