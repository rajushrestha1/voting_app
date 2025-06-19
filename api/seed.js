require('dotenv').config();
const mongoose = require('mongoose');   
const Student = require('./models/Student');

const seedDB = async () => {
    try{
        await mongoose.connect(process.env.URI, {
            
        })
        console.log('MongoDB connected successfully');

        // Clear existing students
        await Student.deleteMany({});
        console.log('Existing students cleared');

        // Seed new students
        const students = [
            {studentId:"123", name:"hey"},
            {studentId:"124", name:"hello"},
        ];
        await Student.insertMany(students);
        console.log('Students seeded successfully');
    }catch (error) {
        console.error('Error seeding database:', error);
    }
}

seedDB();
