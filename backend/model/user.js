const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Not Valid Email");
            }
        }
    },
    password: {
        type: String,
        require: true,
        minLength: 6,
    },
    posts: {
        type: [mongoose.Schema.ObjectId],

    }, tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ]
});

// Token generator

userSchema.methods.generateToken = async function () {
    try {

        let userToken = jwt.sign(
            {
                _id: this._id,
            },
            secretKey,
            {
                expiresIn: "1d"
            }
        );

        this.tokens = this.tokens.concat({ token: userToken });
        await this.save();
        return userToken;

    } catch (err) {
        res.status(422).json(err);
    }

}

module.exports = mongoose.model("User", userSchema); 
