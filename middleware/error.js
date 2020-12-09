//express error handler
const errorHandler = (err, req, res, next) => {
    // Log to the console for dev
    console.log(err.stack.red);

    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || 'Server Error'
    })
}

module.exports = errorHandler;


//since this is a middleware, in order to use it we have to run it through app.use()