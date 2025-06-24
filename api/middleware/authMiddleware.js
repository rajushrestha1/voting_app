const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token || '';
  
  console.log('[AUTH] Middleware triggered');
  console.log(`[AUTH] Received token: ${token ? 'exists' : 'missing'}`);
  
  if (!token) {
    console.log('[AUTH] No token provided');
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    console.log('[AUTH] Verifying token...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    console.log('[AUTH] Token decoded:', decoded);
    req.user = {
      studentId: decoded.studentId,
      name: decoded.name
    };
    
    next();
  } catch (err) {
    console.error('[AUTH] Token verification error:', err.message);
    
    // Specific error handling
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;