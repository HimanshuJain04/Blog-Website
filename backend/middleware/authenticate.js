const jwt = require("jsonwebtoken");
const User = require("../model/user");
require('dotenv').config();

exports.authenticate = async (req, res, next) => {

    try {

        const token = req.headers.authorization;

        if (!token) {
            throw new Error("Token not found, Please SignIn");
        }

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await User.findById(verifyToken._id);

        if (!rootUser) {
            throw new Error("User Not Found");
        }

        req.token = token;
        req.user = rootUser;
        req.userId = rootUser._id;

        next();

    } catch (err) {

        res.status(401).json({
            status: false,
            message: "Unauthorized person"
        })
    }
}