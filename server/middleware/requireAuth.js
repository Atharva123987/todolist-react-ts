const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
    const { authorization } = await req.headers

    try {
        const authToken = authorization.split(' ')[1]
        if (!authToken) {
            return res.status(401).json({ message: "Auth token required" })
        }
        const { user_id } = await jwt.verify(authToken, process.env.SECRET)
        // req.user = await User.findOne({ user_id }).select('_id')
        req.user = await User.findOne({ _id: user_id }).select('_id')

        next();
    }
    catch (err) {
        res.status(401).json({ error: "Request is not authorized" });
    }
}

module.exports = requireAuth