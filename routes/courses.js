const express = require('express')

const { 
    getCourses, getCourse, addCourse, updateCourse, deleteCourse
} = require('../controllers/courses');

const Course = require('../models/Course');
const advancedResults = require('../middleware/advancedResults')

const { protect } = require('../middleware/auth')

//mergeParams : true, because here we are merging the url params
const router = express.Router({mergeParams: true});

router.route('/')
    .get(advancedResults(Course, {
        path: 'bootcamp', 
        select: 'name description'  // populating courses
    }),
    getCourses)
    .post(protect, addCourse)

router.route('/:id')
    .get(getCourse)
    .put(protect, updateCourse)
    .delete(protect, deleteCourse)


module.exports = router;