require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require('path');


const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');


const userlsRoutes = require('./routes/UserLS');
const userRoutes = require('./routes/User');
//const adminRoutes = require('./routes/Admin');
const studentRoutes = require('./routes/Student');
const paymentRoutes = require('./routes/Payment');
const attendenceRoutes = require('./routes/Atendence');

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
app.use('/Payment', paymentRoutes);
app.use('/Atendence', attendenceRoutes);


// swagger connection  

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Edume API Documentation',
        version: '1.0.0',
      },
      servers: [
        {
            api: 'http://localhost:3002/'
        }
      ]
    },
    apis: ['./app.js'], // files containing annotations as above
  };

  const swaggerSpec = swaggerJsDoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



// connect to db
mongoose.connect(process.env.MONG_URL)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log("server is running")
        })
    })
    .catch((error) => console.log(error))



