const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');

router.post('/login', async (req, res) => {
    const {studentId} = req.body;
    if(!studentId){
        return res.status(400).json({message:'student is is required'})
    }
    try {
        const student = await Student.findOne({studentId})
        if(!student){
            return res.status(401).json({message:'invalid student id'})
        }
        const token=jwt.sign({
            studentId: student.studentId,
        }, process.env.JWT_SeCRET, {expiresIn:'1h'});

        res.cookie('token', token,{
            httpOnly: true,
            secure: process.env.NODE_ENV ==='production',
            sameSite: 'strict',
            maxAge: 3600000,//1hour
        });
        res.json({
            message: 'Login successful',
            studentId: student.studentId,
            name: student.name,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({message: 'Internal server error'});
    }
})

router.post('/logout', (req, res)=>{
    res.clearCookie('token');
    res.json({message: 'Logout successful'});
})

module.exports = router;