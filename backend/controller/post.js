const User = require("../model/user");
const Post = require("../model/post");
const cloudinary = require('cloudinary').v2;

async function uploadFileToCloudinary(file, folder) {
    const options = { folder }
    options.resource_type = "auto";
    options.overwrite = true;
    options.invalidate = true;
    return await cloudinary.uploader.upload(file, options);
}


exports.post = async (req, res) => {
    try {

        const { title, description, image, userId } = req.body;

        // find the user by its id

        const verifiedUser = await User.findById(userId);

        if (!verifiedUser) {
            return res.status(401).json({
                status: false,
                message: "Verified User not found for posting"
            });
        }

        // console.log("Verified User : ", verifiedUser);

        // upload the image to the cloudinary----->>
        // File format supported
        const response = await uploadFileToCloudinary(image, "BlogImages");

        // create post
        const post = await Post.create({
            title: title,
            description: description,
            image: response.secure_url,
        });

        // add this post to the user's db
        const user = await User.findByIdAndUpdate(
            userId,
            {
                posts: "himanshu"
            },
            { new: true }
        );

        console.log(" user : ", user);

        // console.log("post : ", post);
        return res.status(200).json({
            status: true,
            post: post,
            // user: user,
            message: "Post uploaded successfully"
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err,
            status: false,
            message: "Post uploaded Failed"
        });
    }
}