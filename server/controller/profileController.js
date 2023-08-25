const Profile = require("../models/profileModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const getProfile = async (req, res) => {
    return res.status(200).json({ message: "profile page!" });
};

const signUp = async (req, res) => {
    try {
        const { username, email, password, age, phoneNo, bio, profileImage } = req.body;
        const existingUser = await Profile.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newProfile = await Profile.create({ username: username, email: email, password: hashedPassword, age: age, phoneNo: phoneNo, bio: bio, profileImage: profileImage });
        const token = jwt.sign({ userId: newProfile._id }, "your_secret_key");

        res.status(201).json({ message: "Profile created", token });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Profile.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        matchedPassword = await bcrypt.compare(user.password, password);
        if (!matchedPassword) {
            return res.status(404).json({ message: "wrong password" });
        }

        const token = jwt.sign({ userId: user._id }, "your_secret_key");

        res.status(200).json({ user: user, token });
    } catch (error) {
        res.status(500).json({ message: "Error signing in" });
    }
};

const deleteProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedProfile = await Profile.findByIdAndDelete(userId);

        if (!deletedProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.status(200).json({ message: "Profile deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting profile" });
    }
};

const updateProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body;

        const updatedProfile = await Profile.findByIdAndUpdate(
            userId,
            updatedData,
            {
                new: true,
            },
        );

        if (!updatedProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res
            .status(200)
            .json({ message: "Profile updated", profile: updatedProfile });
    } catch (error) {
        res.status(500).json({ message: "Error updating profile" });
    }
};

module.exports = {
    getProfile,
    signUp,
    signIn,
    deleteProfile,
    updateProfile,
};
