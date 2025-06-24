require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const mongoose = require('mongoose');

// Debugging environment variables
console.log('[SERVER] Starting server...');
console.log(`[SERVER] NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`[SERVER] PORT: ${process.env.PORT}`);
console.log(`[SERVER] JWT_SECRET: ${process.env.JWT_SECRET ? 'exists' : 'missing'}`);
console.log(`[SERVER] MONGO_URI: ${process.env.MONGO_URI}`);

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Enhanced request logging middleware
app.use((req, res, next) => {
  console.log(`\n[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  console.log('[HEADERS]', JSON.stringify(req.headers));
  console.log('[BODY]', JSON.stringify(req.body));
  next();
});

// Connect to database
connectDB();

// Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const candidateRoutes = require('./routes/candidate');
const voteRoutes = require('./routes/vote');
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/candidate', candidateRoutes);
app.use('/api/vote', voteRoutes);

// Test route
app.get('/api/health', (req, res) => {
  console.log('[SERVER] Health check');
  res.json({ 
    status: 'ok',
    time: new Date(),
    dbState: mongoose.connection.readyState,
    dbName: mongoose.connection.db.databaseName
  });
});

const PORT = process.env.PORT || 3000;

// Connect to DB and then start server
const startServer = async () => {
  try {
    await connectDB();
    
    // Verify database connection
    
    // Debug: Count students
    const Student = require('./models/Student');
    const studentCount = await Student.countDocuments();
    console.log(`[SERVER] Number of students in database: ${studentCount}`);
    
    // List all students
    const students = await Student.find();
    console.log('[SERVER] Students in DB:', students.map(s => s.studentId));
    
    app.listen(PORT, () => {
      console.log(`[SERVER] Running on port ${PORT}`);
    });
  } catch (err) {
    console.error('[SERVER] Failed to start:', err);
    process.exit(1);
  }
};

startServer();