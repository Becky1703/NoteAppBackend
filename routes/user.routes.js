const express = require("express")
const { UserModel } = require("../models/UserModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userRouter = express.Router()

// route for the user
userRouter.get("/", (req, res) => {
   res.send("All users")
})

/**User registration route. 
 * It receives the user's name, email, and password,
 * hashes the password using bcrypt, and saves the user to the database.
 * If there's an error, it returns an error message.
 */

userRouter.post("/register",async (req,res)=>{
    const {name, email, password} = req.body
    
    // Hashes a user's password using bcrypt
    bcrypt.hash(password, 5, async function(err, hash) {
        // if there's an error, return the error message
        if (err) {
            return res.send({message: "something went wrong", status: 0})
        }
        // if there's no error, save the user to the database and return a success message
        try {
            let user = new UserModel ({name, email, password: hash})
        await user.save()
        res.send({
            message: "user registered successfully", 
            status: 1
        })    
        } catch (error) {
            res.send({
                message: err.message, 
                status: 0
        })
    }
    })
})

/**
 * User login route. 
 * It receives the user's email and password,
 * checks if the user exists in the database, and 
 * compares the hashed password with the unhashed password.
 * If the passwords match, it returns a success message with a JWT token. 
 * If the passwords do not match, it returns an error message.
 */
userRouter.post("/login", async (req, res) => {
    const {email, password} = req.body;

    // sets expiration time for token authentication used to get data from database
    let option = {
        expiresIn: "20m"
    }
    //verify if user is available in the database
    try {
      let data = await UserModel.find({ email });
      // compare hashed password and unhashed password
      if (data.length > 0) {
        let token = jwt.sign({ userId: data[0]._id }, "Becky1703", option);
        bcrypt.compare(password, data[0].password, function (err, result) {
          if (err) {
            res.send({ message: "Something went wrong", status: 0 });
          }
          // if the password is correct, return a success message and token
          if (result) {
            res.send({
              message: "Login Successful",
              token: token,
              status: 1,
            });
          } else {
            res.send({
              message: "Wrong credentials",
              status: 0,
            });
          }
        });
        // if user does not exist, return an error message
      } else {
        res.send({
          message: "User not found",
          status: 0,
        });
      }
    } catch (error) {
      res.send({
        message: error.message,
        status: 0,
      });
    }
    
})

module.exports = {userRouter}