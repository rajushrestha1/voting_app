const Candidate = require('../models/Candidate');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Admin login
exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const admin = await Admin.findOne({ username });
    
    if (!admin) {
      return res.status(401).json({ message: 'Kina error' });
    }
    
    const isMatch = await admin.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Wrong Password' });
    }
    
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );
    
    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7200000,
    });
    
    res.json({ message: 'Admin login successful' });
    
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin logout
exports.adminLogout = (req, res) => {
  res.clearCookie('adminToken');y
  res.json({ message: 'Admin logged out successfully' });
};


// Add new candidate
exports.addCandidate = async (req, res) => {
  const { name, party, position } = req.body;
  const file = req.file;

  try {
    if (!file) return res.status(400).json({ message: 'Image file is required' });

    const image = `/uploads/${file.filename}`; // Public path to the uploaded image

    const newCandidate = new Candidate({
      name,
      party,
      position,
      image // This saves the image path into DB
    });

    await newCandidate.save();

    res.status(201).json({ message: 'Candidate created successfully', candidate: newCandidate });
  } catch (err) {
    console.error('[AddCandidate Error]', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove candidate
exports.removeCandidate = async (req, res) => {
  const { id } = req.params;
  
  try {
    const candidate = await Candidate.findByIdAndDelete(id);
    
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    
    res.json({ message: 'Candidate removed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all candidates
exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ votes: -1 });
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get voting results
exports.getResults = async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ votes: -1 });
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};