  // routes/publicRoutes.js
  const express = require('express');
  const router = express.Router();
  const Candidate = require('../models/Candidate');

  router.get('/candidates', async (req, res) => {
    try {
      console.log('Fetching candidates from database...');
      const candidates = await Candidate.find().lean();
      
      if (!candidates || candidates.length === 0) {
        console.log('No candidates found in database');
        return res.json([]);
      }

      const transformedCandidates = candidates.map(candidate => ({
        _id: candidate._id.toString(),
        name: candidate.name,
        party: candidate.party,
        votes: candidate.votes,
        createdAt: candidate.createdAt
      }));

      console.log(`Returning ${transformedCandidates.length} candidates`);
      res.json(transformedCandidates);
    } catch (err) {
      console.error('Database error:', err);
      res.status(500).json({ 
        error: 'Server error',
        message: err.message 
      });
    }
  });

  //  Export the router!
  module.exports = router;
