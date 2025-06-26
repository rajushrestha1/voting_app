const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');
const { studentAuth } = require('../middleware/authMiddleware');

router.post('/', studentAuth, voteController.castVote);

module.exports = router;