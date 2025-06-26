const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { adminAuth } = require('../middleware/authMiddleware');

router.post('/login', adminController.adminLogin);
router.post('/logout', adminController.adminLogout);

// Protected admin routes
router.post('/candidates', adminAuth, adminController.addCandidate);
router.delete('/candidates/:id', adminAuth, adminController.removeCandidate);
router.get('/candidates', adminAuth, adminController.getCandidates);
router.get('/results', adminAuth, adminController.getResults);

module.exports = router;