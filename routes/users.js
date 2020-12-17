const express = require('express')

const { 
    getUsers, 
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/users');

const User = require('../models/User');

const advancedResults = require('../middleware/advancedResults')
const { protect, authorize} = require('../middleware/auth')

//mergeParams : true, because here we are merging the url params
const router = express.Router({mergeParams: true});

router.use(protect) // all the routes below this will use this middleware
router.use(authorize('admin')) // all route below this will be protected and you have to admin as per to perform crud

router
    .route('/')
        .get(advancedResults(User), getUsers)
        .post(createUser);


router
    .route('/:id')
        .get(getUser)
        .put(updateUser)
        .delete(deleteUser)


module.exports = router;