const express = require("express")
const { UserModel } = require("../models/UserModel")
const bcrypt = require("bcrypt")

const userRouter = express.Router()

// route for the user
userRouter.get("/", (req, res) => {
   res.send("All users")
})

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

module.exports = {userRouter}