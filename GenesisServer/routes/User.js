const express = require("express");
const multer = require('multer');

// controller function
const {
    addUser,
    getAllUser,
    getUserByEmail,
    getUser,
    deleteUser,
    updateUser,
    getAll
} = require('../controllers/userController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './profiles'); // Save uploaded files to 'profile' directory
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Use the original filename
    },
    
  }) 

  const upload = multer({ storage: storage })


// require auth for all user routes
router.use(requireAuth)


router.get('/all', getAll)

// add new student/teacher
router.post('/newuser', upload.single('file'), addUser)


// get all student/teacher/admin(seperatlly)
router.get('/role:role', getAllUser)

// get all student/teacher/admin(seperatlly)
router.get('/email:email', getUserByEmail)

// get a single student/teacher/admin
//router.get('/:email', getUser)
router.get('/:id', getUser)

// delete a student/teacher/admin
router.delete('/:id', deleteUser)

// update a student/teacher/admin
router.patch('/:id', updateUser)

module.exports = router