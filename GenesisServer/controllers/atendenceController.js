const Attendence = require('../models/dbSatendence');
const mongoose = require('mongoose');

// Add new Attendence
const addAttendence = async (req, res) => {
    const {student_id, student_name, student_email, stu_number, attend_date, attend_time} = req.body;

    console.log(student_id, student_name, student_email, stu_number, attend_date, attend_time)

    try {
        const attendence = await Attendence.create({
            student_id,
            student_name,
            student_email,
            stu_number,
            attend_date,
            attend_time
        })
        res.status(200).json({ message: "Attendence Marked Successfully" })
        
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getAllAttendences = async (req, res) => {
    const {studentid} = req.params;
    console.log(studentid)
    try {
        const attendence = await Attendence.find({'student_id' : studentid}).sort({$natural:-1})
        res.status(200).json(attendence)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = {
    addAttendence,
    getAllAttendences
}