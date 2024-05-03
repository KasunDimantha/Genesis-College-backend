const express = require('express');
const router = express.Router();
const {
    addAttendence,
    getAllAttendences
} = require('../controllers/atendenceController')

const requireAuth = require('../middleware/requireAuth')

// require auth for all user routes
router.use(requireAuth)

// add new attendence
router.post('/add', addAttendence)

// get all attendences by studentid
router.get('/getAll:studentid', getAllAttendences)

module.exports = router