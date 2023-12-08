const express = require("express")
const cors = require("cors")
const { connection } = require("./db")
const { userRouter } = require("./routes/user.routes")
require("dotenv").config()
const port = process.env.PORT
const app = express()
app.use(cors())
app.use(express.json())
app.use("/user", userRouter)

// Defined the home route
app.get("/",(req,res)=>{
    res.send({ 
        message:"Welcome to home page"
    })
})

// database connection setup
app.listen(port,async()=>{
    try{
        await connection
        console.log("database is connected")
    }catch (error) {
        console.log(error)
    }
     // displays the port number on which the server is running  
    console.log ("Server is running on port number", port)
})