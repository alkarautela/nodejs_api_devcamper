const express = require('express')

const { 
    getReviews,
    getReview,
    addReview
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
        getReviews,
    )
    .post(protect, authorize('user', 'admin'), addReview)

router.route('/:id').get(getReview)

module.exports = router;