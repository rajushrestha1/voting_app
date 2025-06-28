const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');

// GET /api/public/candidates
router.get('/candidates', async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ name: 1 });
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;