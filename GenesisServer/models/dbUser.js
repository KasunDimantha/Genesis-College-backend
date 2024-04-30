const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, require: true},
    email: { type: String, require: true},
    birthday: { type: Date, require: true},
    con_number: { type: Number},
    address: { type: String},
    stu_course: { type: String},
    stu_number: { type: String},
    password: { type: String, require: true},
    filename: { type: String},
    fileUrl: {type:String},
    role: { type: String, require: true},
    qrcode: { type: String},
    
})

// static sihnup method
userSchema.statics.signup = async function (username, email, birthday, con_number, address, password, role) {
    
    // validation
   

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ username, email, birthday, con_number, address, password: hash, role})

    return user
}

// static login method
userSchema.statics.login = async function (email, password) {
    
   

    const user = await this.findOne({email})

    if (!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}


module.exports = mongoose.model('gensisUser', userSchema)