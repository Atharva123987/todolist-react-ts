const mongoose = require('mongoose')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createToken = (user_id) => {
    return jwt.sign({ user_id }, process.env.SECRET, { expiresIn: "1d" })
}

const signUpUser = (async (req, res) => {
    const { email, name, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "Email already in use" })
        }
        else {
            const hash = await bcrypt.hash(password, 10)
            const user = await User.create({
                name,
                email,
                password: hash
            })
            const user_id = await user._id
            const user_email = await user.email
            const token = createToken(user_id)
            console.log("User Created")
            return res.status(200).json({ user_email, token, user_id })
        }
    }
    catch (err) {
        console.log(err)
    }
})

const signInUser = async (req, res) => {
    const { email, password } = req.body
    if (!email | !password) {
        return res.status(400).send("All fields are mandatory")
    }
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(404).send("User not found")
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        return res.status(401).send("Incorrect password")
    }
    const user_id = user._id
    const user_email = user.email
    const token = createToken(user_id)
    return res.status(200).json({ user_email, token, user_id })

}

const getUserDetails = (req, res) => {
    return res.send("Get User Details route")
}

module.exports = { signInUser, signUpUser, getUserDetails }