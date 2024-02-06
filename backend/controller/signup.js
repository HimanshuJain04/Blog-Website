const User = require("../model/user");
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
    try {

        const { username, email, password, confirmPassword } = req.body;

        // all fields are required

        // password and confirm password

        const user = await User.findOne({ email: email });

        if (user) {
            return res.status(401).json({
                status: false,
                message: "Already Signup,Please Login"
            });
        }

        // hash the password
        const hashedPass = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name: username,
            password: hashedPass,
            email: email
        });

        return res.status(200).json({
            status: true,
            user: newUser,
            message: "signup Successfully"
        });


    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err,
            status: false,
            message: "signup Failed"
        });
    }
}