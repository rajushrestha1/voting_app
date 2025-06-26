require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Student = require('../models/Student');
const Admin = require('../models/Admin');
const Candidate = require('../models/Candidate');

const seedDB = async () => {
  try {
    // Connect to DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding');

    // Clear existing data
    await Student.deleteMany();
    await Admin.deleteMany();
    await Candidate.deleteMany();

    // Create students
    const students = [
      { studentId: 'S1001', name: 'John Smith' },
      { studentId: 'S1002', name: 'Emily Johnson' },
      { studentId: 'S1003', name: 'Michael Williams' },
      { studentId: 'S1004', name: 'Sarah Brown' },
      { studentId: 'S1005', name: 'David Davis' },
      { studentId: 'S1006', name: 'Laura Garcia' },
      { studentId: 'S1007', name: 'James Martinez' },
      { studentId: 'S1008', name: 'Linda Rodriguez' },
      { studentId: 'S1009', name: 'Robert Wilson' },
      { studentId: 'S1010', name: 'Patricia Anderson' },
      { studentId: 'S1011', name: 'Charles Taylor' },
      { studentId: 'S1012', name: 'Jennifer Thomas' },
      { studentId: 'S1013', name: 'William Moore' },
      { studentId: 'S1014', name: 'Elizabeth Jackson' },
      { studentId: 'S1015', name: 'Joseph White' }
    ];


    await Student.insertMany(students);

    // Create admin
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin', salt);
    
    const admin = new Admin({
      username: 'admin',
      password: hashedPassword
    });
    await admin.save();

    // Create candidates
    const candidates = [
      { name: 'Alice Johnson', party: 'Education First' },
      { name: 'Bob Smith', party: 'Tech Progress' },
      { name: 'Carol Williams', party: 'Green Future' },
    ];
    await Candidate.insertMany(candidates);

    console.log('Database seeding complete!');
    console.log('Admin credentials: username: admin, password: admin');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedDB();