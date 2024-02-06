// const Post = require("../model/post");
const User = require("../model/user");

exports.getUserPost = async (req, res) => {
    try {

        // fetch token from cookie then get userId  || send userId from frontend to backend
        const { userId } = req.body;

        const verifiedUser = await User.findById(userId);

        return res.status(200).json({
            status: true,
            posts: verifiedUser.posts,
            message: "Get User Post successfully"
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err.message,
            status: false,
            message: "Get User post Failed"
        });
    }
}
