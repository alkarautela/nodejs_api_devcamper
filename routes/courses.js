const express = require('express')

const { 
    getCourses, getCourse, addCourse, updateCourse, deleteCourse
} = require('../controllers/courses');

//mergeParams : true, because here we are merging the url params
const router = express.Router({mergeParams: true});

router.route('/')
    .get(getCourses)
    .post(addCourse)

router.route('/:id')
    .get(getCourse)
    .put(updateCourse)
    .delete(deleteCourse)


module.exports = router;