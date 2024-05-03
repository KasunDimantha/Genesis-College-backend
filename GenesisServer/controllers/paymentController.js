const Payment = require('../models/dbPayment')
const mongoose = require('mongoose')

// add new payment
const addPayment = async (req, res) => {
    const {studentId, student_name, student_email, stu_number, pDate, pAmount} = req.body;

    try {

        const payment = await Payment.create({
            'student_id': studentId,
            student_name,
            student_email,
            stu_number,
            'payment_date': pDate,
            'course_fees': pAmount
        })


        res.status(200).json({ message: "Payment added successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// get all payments
const getAllPayments = async (req, res) => {
    const {stuid} = req.params;
    console.log(stuid)
    try {
        const payment = await Payment.find({'student_id' : stuid}).sort({$natural:-1})
        res.status(200).json(payment)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// get payment by email
const getPayment = async (req, res) => {
    const {email} = req.params;

    try {
        const payment = await Payment.find({'student_email' : email}).limit(1).sort({$natural:-1})
        res.status(200).json(payment)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = {
    addPayment,
    getAllPayments,
    getPayment
}