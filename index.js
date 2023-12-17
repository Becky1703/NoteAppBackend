const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require("express")
const cors = require("cors")
const { connection } = require("./db")
const { userRouter } = require("./routes/user.routes")
const { noteRouter } = require("./routes/note.routes")
require("dotenv").config() 

const app = express()

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Note App API",
            version: "1.0.0",
            description: "This is a simple CRUD API application made with Express and documented with Swagger",
        },
        servers: [
            {
                url: "http://localhost:4000",
            }
        ]
    },
    apis: ["./routes/*.js"]
}

const swaggerSpec = swaggerJsDoc(options)
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use("/user", userRouter) 
app.use("/note", noteRouter)


// Defines the home route for the api
app.get("/",(req,res)=>{ 
    res.send({ 
        message:"Api is working now"
    })
})

// database connection setup
app.listen(port,async()=>{
    try{
        await connection 
        console.log("database is connected")
    // displays error message if there's an error connecting to the database     
    }catch (error) {
        console.log(error)
    }
     // displays the port number on which the server is running  
    console.log ("Server is running on port number", port)
})