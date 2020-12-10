const express = require('express')

const { 
    getCourses,
} = require('../controllers/courses');

//mergeParams : true, because here we are merging the url params
const router = express.Router({mergeParams: true});

router.route('/').get(getCourses);

module.exports = router;