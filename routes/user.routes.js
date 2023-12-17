const express = require("express")
const { UserModel } = require("../models/UserModel")
const bcrypt = require("bcrypt") 
const jwt = require("jsonwebtoken")

const userRouter = express.Router()

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The users managing API
 */

/**
 * @swagger
 * /user:
 *   get:
 *       summary: Returns the list of all the users in the database
 *       tags: [User]
 *       responses:
 *           200:
 *               description: The list of the users
 *               content:
 *                   application/json:
 *                       schema:
 *                          type: array
 *                          items:
 *                               $ref: '#/components/schemas/User'
 * 
 */
 
userRouter.get("/", (req, res) => {
   res.send("All users")
})


/**
 * @swagger
 * components:
 *    schemas:
 *        User:
 *            type: object
 *            required:
 *                - name
 *                - email
 *                - password
 *            properties:
 *                name:
 *                    type: string
 *                    description: The name of the user.
 *                    example: "John Doe"
 *                email:
 *                    type: string
 *                    description: The email address of the user.
 *                    example: "johndoe@example.com"  
 *                password:
 *                    type: string
 *                    description: The password of the user.
 *                    example: "password123"
 *            example:
 *                name: "John Doe"
 *                email: "johndoe@example.com"
 *                password: "XXXXXXXXXXX"
 *        Error:
 *            type: object
 *            properties:
 *                message:
 *                    type: string
 *                    description: The error message.
 *                    example: "Error message"
 *                status:
 *                    type: integer
 *                    description: The HTTP status code.
 *                    example: 500
 *            example:
 *                message: "Error message"
 *                status: 500    
 */

/**
 * @swagger
 * /user/register:
 *  post:
 *      summary: Register a new user
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/schemas/User'
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: The name of the user.
 *                              example: "John Doe"
 *                          email:
 *                              type: string
 *                              description: The email address of the user.
 *                              example: "johndoe@example.com"
 *                          password:
 *                              type: string
 *                              description: The password of the user.  
 *                              example: "password123"
 *      responses:
 *          200:
 *              description: The user was successfully registered
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          500:
 *              description: Some server error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 *          400:
 *              description: Bad request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 * 
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
 * @swagger
 * components:
 *    schemas:
 *        User:
 *            type: object
 *            required:
 *                - email
 *                - password
 *            properties:
 *                email:
 *                    type: string
 *                    description: The email address of the user.
 *                    example: "johndoe@example.com"
 *                password:
 *                    type: string
 *                    description: The password of the user.
 *                    example: "password123"
 *            example:
 *                email: "johndoe@example.com"
 *                password: "XXXXXXXXXXX"
 *        Error:
 *            type: object
 *            properties:
 *                message:
 *                    type: string
 *                    description: The error message.
 *                    example: "Error message"
 *                status:
 *                    type: integer
 *                    description: The HTTP status code.
 *                    example: 500
 *            example:
 *                message: "Error message"
 *                status: 500
 */

/**
 * @swagger
 * /user/login:
 *    post:
 *      summary: Login a user
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          200:
 *              description: The user was successfully logged in
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              token:
 *                                  type: string
 *                              status: 
 *                                  type: number
 *          500:
 *              description: Some server error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 *          400:
 *              description: Bad request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 *          404:
 *              description: User not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 * 
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