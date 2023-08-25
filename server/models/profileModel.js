const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: false,
    },
    age: {
        type: Number, // Add the age field as a number
    },
    phoneNo: {
        type: String, // Add the phoneno field as a string
    },
    bio: {
        type: String, // Add the bio field as a string
    },
    profileImage: {
        type: String, // Add the profile image field as a string (URL or file path)
    },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
