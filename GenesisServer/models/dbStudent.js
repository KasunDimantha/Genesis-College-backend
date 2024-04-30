const mongoose = require('mongoose')


const dbStudentSchema = new mongoose.Schema({
    student_id: {type: String},
    student_name: {type: String},
    payment: {
        payment_date: {type: Date},
        isPaied: {type: Boolean, default: false}
    },
    course: {
        course_id: {type:String},
        course_name: {type: String},
        course_entroll: {type: Boolean, default: false}
    },
    semester_reg: [{
        semester_id: {type:String},
        semester_reg_entroll: {type: Boolean, default: false}
    }],
    student_atendence: {type: String}
})

const DBStudentModel = mongoose.model("genesisStudent", dbStudentSchema)
module.exports = DBStudentModel