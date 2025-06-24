const express=require('express');
const router=express.Router();
const Candidate=require('../models/Candidate');
const authMiddleware = require('../middleware/authMiddleware')

router.get("/", async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.status(200).json(candidates);
    } catch (error) {
        res.status(500).json({ message: "Error fetching candidates", error });
    }
});
router.post('/', authMiddleware, async (req, res) => {
    const { candidateId, name, party, image, description } = req.body;
    if (!candidateId || !name || !party || !image || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try
    {
        const newCandidate = new Candidate({
            candidateId,
            name,
            party,
            image,
            description
        })
        await newCandidate.save();
        res.status(201).json(newCandidate);
    } catch (error) {
        res.status(500).json({ message: "Error creating candidate", error });
    }
})

module.exports = router;
