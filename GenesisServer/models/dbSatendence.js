const mongoose = require('mongoose')

const satendenceSchema = new mongoose.Schema({
    student_id: {type:String, required: true},
    student_name: {type:String},
    student_email: {type:String, required: true},
    stu_number: { type: String},
    attend_date: { type: String, required: true},
    attend_time: { type: String, required: true}
})

// Create a model based on the schema
const Satendence = mongoose.model('genesisAttendence', satendenceSchema);

module.exports = Satendence;