const User = require("../model/user");
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        // all fields are required

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).json({
                status: false,
                message: "Please Signup first"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                status: false,
                message: "Wrong Password"
            });
        }

        req.user = user;

        // jwt authentication and session id
        const token = await user.generateToken();

        // cookie Generator
        res.cookie("UserCookie", token, {
            expires: new Date(Date.now() + 9000000),
            httpOnly: true,
        });

        const result = {
            user,
            token,
        }

        return res.status(200).json({
            status: true,
            user: result,
            message: "Login Successfully"
        });

    } catch (err) {

        return res.status(500).json({
            error: err,
            status: false,
            message: "Login Failed"
        });
    }
}