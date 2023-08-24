const express = require('express')
const router = express.Router();

const {
    signInUser, signUpUser, getUserDetails
} = require('../controller/userController')

router.post('/signin', signInUser)
router.post('/signup', signUpUser)
router.get('/:id', getUserDetails)

module.exports = router