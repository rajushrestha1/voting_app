const mongoose = require('mongoose');

const db =() => {
    try {
        mongoose.connect(`${process.env.MONGO_URI}`)
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

module.exports = db;
