const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { dbConnection } = require("./config/DbConnection");
const { router } = require('./routes/route');
const cloudinaryConnect = require('./config/Cloudinary');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');



const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// app.use(fileUpload({ useTempFiles: false }));
// app.use(bodyParser.json({
//     type: ["application/x-www-form-urlencoded", "application/json"], // Support json encoded bodies
// }));



// route mount
app.use("/api/v1", router);

dbConnection();
cloudinaryConnect();

// server listen
app.listen(PORT, () => {
    console.log("Server is listening on :", PORT);
});

// default route
app.get("/", (req, res) => {
    res.send("Default Route");
});


