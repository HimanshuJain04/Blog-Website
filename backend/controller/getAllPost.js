const Post = require("../model/post");


exports.getAllPost = async (req, res) => {
    try {

        const allPosts = await Post.find({});

        return res.status(200).json({
            status: true,
            post: allPosts,
            message: "Get All Post successfully"
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err.message,
            status: false,
            message: "Get All post Failed"
        });
    }
}
