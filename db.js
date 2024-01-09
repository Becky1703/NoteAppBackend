
// Imports the Monggose library
const mongoose = require("mongoose")

// Load the environment variabele in .env file
require("dotenv").config()

// Connects to Mongodb database using the provided URL from the environment variable
const connection =  mongoose.connect(process.env.mongoUrl);  

// Exports the connection variable so it can be used in other files.
module.exports = {
    connection,
};