const Profile = require('../models/profileModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (_id) => {
    return jwt.sign({ userId: _id }, process.env.SECRET);

}

const getProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = await Profile.findById(id);
        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(userData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching profile' });
    }
};

const signUp = async (req, res) => {
    try {
        const { username, email, password, age, phoneNo, bio, profileImage } = req.body;
        const existingUser = await Profile.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newProfile = await Profile.create({
            username,
            email,
            password: hashedPassword,
            age,
            phoneNo,
            bio,
            profileImage
        });
        const token = createToken(newProfile._id);
        // const token = jwt.sign({ userId: newProfile._id }, process.env.SECRET);

        res.status(201).json({ message: 'Profile created', token });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Profile.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const matchedPassword = await bcrypt.compare(password, user.password);
        if (!matchedPassword) {
            return res.status(404).json({ message: 'Wrong password' });
        }

        const token = createToken(user._id);

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: 'Error signing in' });
    }
};

const deleteProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProfile = await Profile.findByIdAndDelete(id);

        if (!deletedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json({ message: 'Profile deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting profile' });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProfile = await Profile.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true } // Return the updated document
        );

        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json({ message: 'Profile updated', profile: updatedProfile });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProfile,
    signUp,
    signIn,
    deleteProfile,
    updateProfile,
};
