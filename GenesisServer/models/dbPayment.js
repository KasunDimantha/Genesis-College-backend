const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    student_id: {type:String, required: true},
    student_name: {type:String},
    student_email: {type:String, required: true},
    stu_number: { type: String},
    payment_date: {type: String, required: true},
    course_fees: {type:Number, required: true},
});


// Create a model based on the schema
const Payment = mongoose.model('genesisPayment', paymentSchema);

module.exports = Payment;