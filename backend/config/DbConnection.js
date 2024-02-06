const mongoose = require('mongoose');
require('dotenv').config();

exports.dbConnection = () => {

    mongoose.connect(process.env.DB_URL).then(() => {
        console.log("database connection established");

    }).catch((err) => {
        console.log("Database connection error: ");
        console.log(err);
        process.exit(1);
    });
}