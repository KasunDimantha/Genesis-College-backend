const express = require('express');
const router = express.Router();
const AdminModel = require('./models/dbAdmin')

router.post('/register', (req, res) => {
    AdminModel.create(req.body)
    .then(admin => res.json(admin))
    .catch(err => res.json(err))
})

router.post("/login", (req, res) => {
    const {email, password} = req.body;
    AdminModel.findOne({email})
    .then(user => {
        if (user) {
            if (user.password === password) {
                res.json("Success")
            } else {
                res.json("Password is incorect")
            }
        } else {
            res.json("user not exist")
        }
    })
})


module.exports = router;