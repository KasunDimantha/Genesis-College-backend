require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require('path');


const userlsRoutes = require('./routes/UserLS');
const userRoutes = require('./routes/User');
//const adminRoutes = require('./routes/Admin');
const studentRoutes = require('./routes/Student');

//express app
const app = express();

/*const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:5173', '*'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    preflightContinue: false,
    optionsSuccessStatus: 204
  };*/

app.use(cors());


// midlware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

app.use('/profiles', express.static(path.join(__dirname, 'profiles')));


app.use('/UserLS', userlsRoutes);
app.use('/User', userRoutes);
//app.use('/Admin', adminRoutes);
app.use('/Student', studentRoutes);

// connect to db
mongoose.connect(process.env.MONG_URL)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log("server is running")
        })
    })
    .catch((error) => console.log(error))



