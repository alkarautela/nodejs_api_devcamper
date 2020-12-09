const express = require('express')
const dotenv = require('dotenv')
// const logger = require('./middleware/logger')
const morgan = require('morgan')
const colors = require('colors')
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db');


// Load env variables
dotenv.config({path: './config/config.env'});

// Connect to database
connectDB(); 

// Route files
const bootcamps = require('./routes/bootcamps');


// initialize app variable with express
const app = express();

//// Body parser //to read request.body we have to add this piece of middleware that's included by the express
app.use(express.json())

// Dev logging middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//Mount routers 
app.use('/api/v1/bootcamps', bootcamps);

//this middleware have to below then bootcamps, else it will not catch the error
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

//global handler for unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);

    //close server and exit process
    server.close(()=> {
        process.exit(1)
    })
})




