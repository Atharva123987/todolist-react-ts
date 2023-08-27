const express = require("express");
const {
    signUp,
    signIn,
    getProfile,
    deleteProfile,
    updateProfile,
} = require("../controller/profileController.js");

const authenticateUser = require('../middleware/profileAuth.js');

const router = express.Router();

// AUTH MIDDLEWARE
// router.use(requireAuth)

router.get('/:id', authenticateUser, getProfile);
router.post('/signup', signUp);
router.post('/signin', signIn);
router.delete('/:id', authenticateUser, deleteProfile);
router.patch('/:id', authenticateUser, updateProfile);

module.exports = router;
