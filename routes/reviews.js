const express = require('express')

const { 
    getReviews
} = require('../controllers/reviews');

const Review = require('../models/Review');

const advancedResults = require('../middleware/advancedResults')
const { protect, authorize} = require('../middleware/auth')

//mergeParams : true, because here we are merging the url params
const router = express.Router({mergeParams: true});

router.route('/')
    .get(
        advancedResults(Review, {
        path: 'bootcamp', 
        select: 'name description'  // populating reviews
    }),
    getReviews)

module.exports = router;