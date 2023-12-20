const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require("express")
const cors = require("cors")
const { connectDB } = require("./db")
const { userRouter } = require("./routes/user.routes")
const { noteRouter } = require("./routes/note.routes")
require("dotenv").config() 

const app = express()

//swagger documentation
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

app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Disposition", "attachment; filename=docs");

    const formattedSwaggerSpec = JSON.stringify(swaggerSpec, null, 2);
    res.send(formattedSwaggerSpec);
});

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


connectDB().then(() => {
    app.listen(port, () => {
        console.log("listening for requests");
    })
})

// sets up connection and starts the server
//const server = app.listen(4000, async () => {
   // try {
     // await connection;
       // console.log('Database is connected');
       // console.log('Server is running on port number 4000');
   // } catch (error) {
   //   console.error(error);
  //  }
  //});
 
module.exports = { app }