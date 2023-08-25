const express = require("express");
const {
    signUp,
    signIn,
    getProfile,
    deleteProfile,
    updateProfile,
} = require("../controller/profileController.js");

const router = express.Router();

router.get("/:username", getProfile);
router.delete("/:username", deleteProfile);
router.patch("/:username", updateProfile);
router.post("/signup", signUp);
router.post("/signin", signIn);

module.exports = router;
