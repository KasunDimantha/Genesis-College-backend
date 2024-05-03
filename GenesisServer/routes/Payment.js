const express = require('express');
const router = express.Router();
const {
    addPayment,
    getAllPayments,
    getPayment
} = require('../controllers/paymentController')

const requireAuth = require('../middleware/requireAuth')

// require auth for all user routes
router.use(requireAuth)

// add new payment
router.post('/add', addPayment)

// get all payments by studentid
router.get('/all:stuid', getAllPayments)

// get single payments
router.get('/email:email', getPayment)


module.exports = router