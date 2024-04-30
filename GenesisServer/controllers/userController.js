const { fileURLToPath } = require('url');
const User = require('../models/dbUser')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const path = require('path');
const bcrypt = require('bcrypt');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    console.log(email, password)
    

    try {
        const user = await User.login(email, password)

        // create token
        const token = createToken(user._id)

        res.status(200).json({_id: user._id, username:user.username, email, con_number:user.con_number, role:user.role, token })

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// signup user
const signupUser = async (req, res) => {

    const {username, email, birthday, con_number, address, password, role} = req.body
    console.log("kasun")
    console.log(username, email, birthday, con_number, address, password, role)
 

    try {
        const user = await User.signup(username, email, birthday, con_number, address, password, role)

        // create a token
        const token = createToken(user._id)

        res.status(200)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// add new student/teacher
const addUser = async (req, res) => {
    if (!req.file) {
        //return res.status(400).json({ error: 'No file uploaded' });
    }

    //const { originalname, path } = req.file;
    const {username, email, birthday, studentid, course, number, address, password, file, student, qrcode} = req.body
    
    console.log(username, email, birthday, studentid, course, number, address, password, file, student, qrcode)
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    
    const newUser = new User({
        username,
        email,
        birthday,
        con_number: number, 
        address, 
        stu_number: studentid,
        stu_course: course, 
        password: hash,
        filename: file,
        role: student,
        qrcode
        });
   
    const slip = await newUser.save();
    res.status(201).json({ message: 'user uploaded successfully' });
     
}

// get all student/teacher/admin(seperatlly)
const getAllUser = async (req, res) => {
    const {role} =  req.params
    const users = await User.find({role}).sort({createdAt: -1})
    console.log(users)

    res.status(200).json(users)
}

const getUserByEmail = async (req, res) => {
    const {email} =  req.params

    console.log(email)

    const users = await User.find({email})
    console.log(users)

    res.status(200).json(users)
}

const getAll = async (req, res) => {
    const users = await User.find({}).sort({createdAt: -1})

    res.status(200).json(users)
}

const getUser = async (req, res) => {
    const { id } = req.params
    
    try {
        const user = await User.find({_id: id})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ message: error.message })
        console.log(error)
    }
}
/*
// get a single student/teacher/admin
const getUser = async (req, res) => {
    const {id} =  req.body
    console.log(req.body)
    const users = await User.find({_id: req.body})

    res.status(200).json(users)
}
*/


// delete a student/teacher/admin
const deleteUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user'})
    }

    const user = await User.findOneAndDelete({_id: id})

    if (!user) {
        return res.status(404).json({error: 'No such user.'})
    } 
    res.status(200).json(user)
}


// update a student/teacher/admin
const updateUser = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such user'})
    }
  
    const user = await User.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!user) {
      return res.status(400).json({error: 'No such user'})
    }
  
    res.status(200).json(user)
  }


module.exports = {
    loginUser,
    signupUser,
    addUser,
    getAllUser,
    getUserByEmail,
    getUser,
    deleteUser,
    updateUser,
    getAll
}