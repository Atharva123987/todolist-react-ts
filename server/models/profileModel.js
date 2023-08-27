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
        type: Number, 
    },
    phoneNo: {
        type: String, 
    },
    bio: {
        type: String, 
    },
    profileImage: {
        type: String, 
    },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
