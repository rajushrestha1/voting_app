const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.studentLogin);
router.post('/logout', authController.studentLogout);

module.exports = router;