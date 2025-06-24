const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/login', async (req, res) => {
  let { username, password } = req.body;
  
  console.log('[ADMIN] Login attempt');
  console.log(`[ADMIN] Received credentials - username: ${username}`);
  
  if (!username || !password) {
    console.log('[ADMIN] Missing credentials');
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Clean inputs
  username = username.trim().toLowerCase();
  password = password.trim();
  console.log(`[ADMIN] Normalized credentials - username: ${username}`);

  try {
    console.log(`[ADMIN] Searching for admin: ${username}`);
    const admin = await Admin.findOne({ username });
    
    if (!admin) {
      console.log(`[ADMIN] Admin not found: ${username}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('[ADMIN] Admin found, comparing password...');
    const isMatch = await bcrypt.compare(password, admin.password);
    
    if (!isMatch) {
      console.log('[ADMIN] Password mismatch');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('[ADMIN] Password match confirmed');
    
    // JWT creation
    const payload = { 
      id: admin._id, 
      username: admin.username 
    };
    
    console.log('[ADMIN] Creating JWT with payload:', payload);
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

    console.log('[ADMIN] Setting cookie...');
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7200000,
    });

    console.log('[ADMIN] Login successful');
    res.json({ message: 'Admin login successful' });
  } catch (err) {
    console.error('[ADMIN] Server error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/logout', (req, res) => {
  console.log('[ADMIN] Logout request');
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;