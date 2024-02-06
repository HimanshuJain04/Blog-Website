const express = require('express');
const User = require("../model/user");
const { login } = require("../controller/login");
const { signup } = require("../controller/signup");
const { post } = require("../controller/post");
const { getAllPost } = require('../controller/getAllPost');
const { getUserPost } = require('../controller/getUserPost');
const { authenticate } = require("../middleware/authenticate");
const route = express.Router();
const multer = require('multer');


const upload = multer({ dest: "upload/" });

route.post("/login", login);
route.post("/signup", signup);
route.get("/getAllPost", getAllPost);
route.post("/getUserPost", getUserPost);
// app.post("/api/v1/post", upload.single('image'), (req, res) => {
//     console.log("body: ", req.body);
//     console.log("file: ", req.file);
//     res.send("done");
// });

// middleware for validation
route.get("/validate", authenticate, async (req, res) => {

    try {
        const validUser = await User.findById(req.userId);

        res.status(201).json({
            status: true,
            validUser: validUser,
        });

    } catch (e) {

        res.status(401).json({
            status: false,
            error: e.message,
        });

    }
});

exports.router = route;
