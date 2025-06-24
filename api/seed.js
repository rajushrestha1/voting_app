require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Student = require('./models/Student');
const Admin = require('./models/Admin');
const Candidate = require('./models/Candidate');
const Vote = require('./models/Vote');

console.log('[SEED] Starting database seeding...');
console.log(`[SEED] MONGO_URI: ${process.env.MONGO_URI}`);

const resetFlag = process.argv.includes('--reset');

const seedDB = async () => {
  try {
    console.log('[SEED] Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('[SEED] MongoDB connected');
    console.log(`[SEED] Database name: ${mongoose.connection.db.databaseName}`);

    if (resetFlag) {
      console.log('[SEED] Resetting collections...');
      await Student.deleteMany();
      await Admin.deleteMany();
      await Candidate.deleteMany();
      await Vote.deleteMany();
      console.log('[SEED] All collections reset');
    }

    // Seed Students - Using uppercase IDs for consistency
    const students = [
      { studentId: '100', name: 'John Smith' },
      { studentId: 'S1002', name: 'Emily Johnson' },
      { studentId: 'S1003', name: 'Michael Williams' },
      { studentId: 'S1004', name: 'Sarah Brown' },
      { studentId: 'S1005', name: 'David Davis' },
    ];
    
    const studentResults = await Student.insertMany(students);
    console.log(`[SEED] Created ${studentResults.length} students`);
    console.log('[SEED] Student IDs:', students.map(s => s.studentId));

    // Verify student insertion
    const insertedStudents = await Student.find();
    console.log('[SEED] Actual students in DB:', insertedStudents);

    // Seed Admin 
    const adminusername = 'admin';
    const adminPassword = 'admin123';
    const existingAdmin = await Admin.findOne({ username: adminusername });

    if (!existingAdmin) {
      console.log('[SEED] Creating admin account...');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);
      
      const admin = new Admin({
        username: adminusername,
        password: hashedPassword
      });
      
      await admin.save();
      console.log(`[SEED] Admin created - username: ${adminusername}, password: ${adminPassword}`);
    } else {
      console.log('[SEED] Admin already exists');
    }

    // Seed Candidates
    const candidates = [
      { name: 'Alice Johnson', party: 'Education First' },
      { name: 'Bob Smith', party: 'Tech Progress' },
      { name: 'Carol Williams', party: 'Green Future' },
    ];
    
    const candidateResults = await Candidate.insertMany(candidates);
    console.log(`[SEED] Created ${candidateResults.length} candidates`);
    console.log('[SEED] Candidates:', candidates);

    console.log('[SEED] Database seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('[SEED] Error:', err);
    process.exit(1);
  }
};

seedDB();