const jwt = require('jsonwebtoken');

// Student authentication middleware
exports.studentAuth = (req, res, next) => {
  const token = req.cookies.studentToken || '';
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.student = {
      studentId: decoded.studentId,
      name: decoded.name
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Admin authentication middleware
exports.adminAuth = (req, res, next) => {
  const token = req.cookies.adminToken || '';
  
  if (!token) {
    return res.status(401).json({ message: 'Admin authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = {
      id: decoded.id,
      username: decoded.username
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid admin token' });
  }
};