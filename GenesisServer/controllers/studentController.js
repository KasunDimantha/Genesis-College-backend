const mongoose = require('mongoose')
const Student = require('../models/dbStudent')

// post new student data
const createStudent = async (req, res) => {
    const {student_id, student_name, course_id, course_name } = req.body;

    try {
        //const  student_id = req.user._id;
        const student = await Student.create({student_id, student_name, 'course.course_id': course_id, 'course.course_name': course_name})
        res.status(200).json(student)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// get all student data
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find({}).sort({createdAt: -1})
        res.status(200).json(students)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// get a singe student data
const getStudent = async (req,res) => {
    const { id } = req.params

    try {
        const student = await Student.find({student_id: id})
        res.status(200).json(student)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}



// get student by payment
const getStudentByPayment = async (req, res) => {
    const { payment } = req.params
    console.log(payment)

    try {
        const student = await Student.find({'payment.isPaied': payment})
        console.log(student)
        res.status(200).json(student)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// get student by course entrolled
const getStudentByCourse = async (req, res) => {
    const { courseentrolled } = req.params
    console.log(req.params)

    try {
        const student = await Student.find({'course.course_entroll': courseentrolled})
        console.log(student)
        res.status(200).json(student)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// get students by semester
const getStudentBySemester = async (req, res) => {
    const { semester } = req.params

    try {
        const student = await Student.find({'semester.semester_name': semester})
        res.status(200).json(student)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


// get student by module
const getStudentByStudentid = async (req, res) => {
    const { id } = req.params
    console.log(id)

    try {
        const student = await Student.find({student_id: id})
        res.status(200).json(student)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// update a student data
const updateStudent = async (req, res) => {
    const { id } = req.params
    const { course_entroll } = req.body
    console.log(id)
    console.log(course_entroll)

    try {
        const student = await Student.findOneAndUpdate({_id: id}, {
            'course.course_entroll': course_entroll
          })
          console.log(student)
          res.status(200).json(student)
    } catch (error) {
        res.status(400).json(error)
    }
  
  }

// delete a student data
const deleteStudent = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Student'})
    }

    const student = await Student.findOneAndDelete({student_id: id})

    if (!student) {
        return res.status(404).json({error: 'No such student.'})
    } 
    res.status(200).json(student)
}


module.exports = {
    createStudent,
    getAllStudents,
    getStudent,
    getStudentByPayment,
    getStudentByCourse,
    getStudentBySemester,
    getStudentByStudentid,
    updateStudent,
    deleteStudent
}