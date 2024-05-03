const mongoose = require('mongoose')



const dbStudentSchema = new mongoose.Schema({
    student_id  : {type: String},
    student_name: {type: String},
    email       : {type: String},
    payment     : {
        payment_date: {type: Date},
        isPaied     : {type: Boolean, default: false},
        fullAtend   : {type: Number},
        noOfAtend   : {type: Number, default: 0},
    }
})

const DBStudentModel = mongoose.model("genesisStudent", dbStudentSchema)
module.exports = DBStudentModel