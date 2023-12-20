const express = require('express')
// Imports the Monggose library
const mongoose = require("mongoose")

const app = express()
// Load the environment variabele in .env file
require("dotenv").config()

// Connects to Mongodb database using the provided URL from the environment variable
// const connection = mongoose.connect(process.env.mongoUrl)
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.mongoUrl);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

// Exports the connection variable so it can be used in other files.
module.exports = {
    connectDB
};