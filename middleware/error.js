const ErrorResponse = require('../utils/errorResponse')

//express error handler
const errorHandler = (err, req, res, next) => {
    let error  = {...err}

    error.message = err.message
    // Log to the console for dev
    console.log(err.errors);

    // Mongoose bad ObjectId
    if(err.name === 'CastError'){
        const message = `Bootcamp not found with id of ${err.value}`
        error = new ErrorResponse(message, 404)
    }

    // Mongoose duplicate key
    if(err.code === 11000){
        const message = 'Duplicate field value entered';
        error = new ErrorResponse(message, 400)
    }

    // Mongoose Validation error
    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    })
}

module.exports = errorHandler;


//since this is a middleware, in order to use it we have to run it through app.use()