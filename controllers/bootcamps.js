const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Bootcamp = require('../models/Bootcamp')


// @desc        Get all bootcamps
//@route        GET /api/v1/bootcamps
//@access       Public
exports.getBootcamps = asyncHandler( async(req, res, next) => {  //these are middleware functions
    const bootcamps = await Bootcamp.find()
    res.status(200).json({success: true, count: bootcamps.length, data: bootcamps})
})


// @desc        Get a single bootcamps
//@route        GET /api/v1/bootcamps/:id
//@access       Public
exports.getBootcamp = asyncHandler( async(req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id)

    if(!bootcamp){
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)) //this will fire if id is formatted object id
    }
    
    res.status(200).json({success: true, data: bootcamp})
})


// @desc        create new bootcamp
//@route        POST /api/v1/bootcamps
//@access       Private
exports.createBootcamp = asyncHandler( async(req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
        success: true,
        data: bootcamp
    })
})


// @desc        update new bootcamp
//@route        PUT /api/v1/bootcamps/:id
//@access       Private
exports.updateBootcamp = asyncHandler( async(req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true, 
        runValidators: true //for running mongoose validator on update
    });

    if(!bootcamp){
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
    }

    res.status(200).json({success: true, data: bootcamp})
})


// @desc        delete new bootcamp
//@route        DELETE /api/v1/bootcamps/:id
//@access       Private
exports.deleteBootcamp = asyncHandler(async(req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if(!bootcamp){
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
    }

    res.status(200).json({success: true, data: {}})
})