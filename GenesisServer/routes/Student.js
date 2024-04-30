const express = require('express');
const router = express.Router();

// controller function
const {
    createStudent,
    getAllStudents,
    getStudent,
    getStudentByPayment,
    getStudentByCourse,
    getStudentBySemester,
    getStudentByStudentid,
    updateStudent,
    deleteStudent,
} = require('../controllers/studentController')
const requireAuth = require('../middleware/requireAuth')


// require auth for all student routes
router.use(requireAuth)

// post new student data
router.post('/', createStudent)

// get all student data
router.get('/', getAllStudents)


// get student by payment
router.get('/payment:payment', getStudentByPayment)

// get student by course
router.get('/course:courseentrolled', getStudentByCourse)

// get students by semester
router.get('/semester:semester', getStudentBySemester)

// get student by module
router.get('/module:id', getStudentByStudentid)

// get a singe student data
router.get('/:id', getStudent)

// update a student data
router.patch('/:id', updateStudent)

// delete a student data
router.delete('/:id', deleteStudent)

module.exports = router;