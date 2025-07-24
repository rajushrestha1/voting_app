require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Student = require('./models/Student');
const Admin = require('./models/Admin');
const Candidate = require('./models/Candidate');

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
      console.log('[SEED] All collections reset');
    }

    // Students (Added votedFor field)
    const students = [
      { 
        studentId: '1', 
        name: 'Raju Shrestha',
        votedFor: { president: null, vicePresident: null, generalCandidates: [] }
      },
      {
        studentId: '2',
        name: 'Saroj Shrestha',
        votedFor: { president: null, vicePresident: null, generalCandidates: [] }
      },
      {
        studentId: '3',
        name: 'Aayush Aryal',
        votedFor: { president: null, vicePresident: null, generalCandidates: [] }
      },
      {
        studentId: '4',
        name: 'Neupane',
        votedFor: { president: null, vicePresident: null, generalCandidates: [] }
      },
      {
        studentId: '5',
        name: 'Dahal',
        votedFor: { president: null, vicePresident: null, generalCandidates: [] }
      },
      {
        studentId: '6',
        name: 'Sita Thapa',
        votedFor: { president: null, vicePresident: null, generalCandidates: [] }
      }
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

    // Candidates (✅ Added votes: 0 explicitly)
    const parties = ['Education First', 'Tech Progress', 'Green Future', 'Unity Party'];

    const candidates = [];

    parties.forEach(party => {
      candidates.push(
        { name: `President of ${party}`, party, position: 'President', votes: 0 },
        { name: `Vice President of ${party}`, party, position: 'Vice President', votes: 0 },
        { name: `${party} Candidate 1`, party, position: 'Candidate', votes: 0 },
        { name: `${party} Candidate 2`, party, position: 'Candidate', votes: 0 }
      );
    });

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
    console.log('[SEED] Candidates:', currentCandidates.map(c => `${c.name} (${c.party} - ${c.position})`));

    console.log('[SEED] Database seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('[SEED] Error:', err);
    process.exit(1);
  }
};

seedDB();
