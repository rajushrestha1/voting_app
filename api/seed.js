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

    // Students
    const students = [
      { studentId: '1', name: 'Raju Shrestha' },
      { studentId: '2', name: 'Saroj Shrestha' },
      { studentId: '3', name: 'Aayush Aryal' },
      { studentId: '4', name: 'Neupane' },
      { studentId: '5', name: 'Dahal' },
    ];

    for (const student of students) {
      await Student.updateOne(
        { studentId: student.studentId },
        { $set: student },
        { upsert: true }
      );
    }

    const updatedStudents = await Student.find();
    console.log(`[SEED] Seeded/Updated ${updatedStudents.length} students`);
    console.log('[SEED] Students:', updatedStudents.map(s => `${s.studentId} - ${s.name}`));

    // Admin
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

    // Candidates
    const candidates = [
      { name: 'Raju Dada', party: 'Education First' },
      { name: 'Saroj Dada', party: 'Tech Progress' },
      { name: 'Aayush Dada', party: 'Green Future' },
    ];

    if (resetFlag) {
      await Candidate.insertMany(candidates);
      console.log(`[SEED] Created ${candidates.length} candidates`);
    } else {
      for (const candidate of candidates) {
        await Candidate.updateOne(
          { name: candidate.name },
          { $set: candidate },
          { upsert: true }
        );
      }
      console.log('[SEED] Candidates inserted/updated');
    }

    const currentCandidates = await Candidate.find();
    console.log('[SEED] Candidates:', currentCandidates.map(c => `${c.name} (${c.party})`));

    console.log('[SEED] Database seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('[SEED] Error:', err);
    process.exit(1);
  }
};

seedDB();
//node seed.js --reset