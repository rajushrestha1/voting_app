const express= require('express');
const Vote = require('../models/Vote');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
    
        const { candidateId } = req.body;
        const { studentId, name } = req.user;

        if (!candidateId){
            return res.status(400).json({ message: 'Candidate ID is required' });
        }
   try{
        // Check if the student has already voted
        const existingVote = await Vote.findOne({studentId});
        if (existingVote) {
            return res.status(400).json({ message: 'You have already voted' });
        }   
        const candidate = await Candidate.findById(candidateId);
        if(!candidate){
            return res.status(404).json({ message: 'Candidate not found' });
        }
        // Create a new vote
        const vote= new Vote({
            studentId,
            name,
            candidateId,
        })
        await vote.save();

        //increment the vote count for the candidate
        candidate.voteCount = (candidate.voteCount || 0) + 1;   
        await candidate.save();

        console.log(`${name}(${studentId}) voted for ${candidate.name} `);
        res.json({ message:'Vote counted succesfully'} )

   }catch (error) {
        console.error('Error casting vote:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
