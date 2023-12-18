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

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the name, email, and password are provided
    if (!name || !email || !password) {
      return res.status(500).send({ message: 'Invalid registration data', status: 0 });
    }

    // Check if the email is already registered
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).send({ message: 'Email is already registered', status: 0 });
    }

    // Hashes a user's password using bcrypt
    bcrypt.hash(password, 5, async function (err, hash) {
      if (err) {
        return res.status(500).send({ message: 'Something went wrong', status: 0 });
      }

      try {
        let user = new UserModel({ name, email, password: hash });
        await user.save();
        res.status(200).send({
          message: 'User registered successfully',
          status: 1,
        });
      } catch (error) {
        res.status(500).send({
          message: error.message || 'An error occurred',
          status: 0,
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'An error occurred',
      status: 0,
    });
  }
});


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
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).send({ message: 'User not found', status: 0 });
    }

    if (password.length < 6) {
      return res.status(401).send({ message: 'Invalid password', status: 0 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ message: 'Incorrect password', status: 0 });
    }

    // Generate and send a JWT token upon successful login
    const token = jwt.sign({ userId: user._id }, "Becky1703", { expiresIn: "20m" });
    res.status(200).send({
      message: 'Login Successful',
      token,
      status: 1,
    });
  } catch (error) {
    console.error(error);

  // Check for specific error types related to invalid tokens
   if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      console.log('Token error:', error.message);
      return res.status(401).send({ message: 'Invalid token', status: 0 });
    }


    res.status(500).send({
      message: 'An error occurred',
      status: 0,
    });
  }
});

module.exports = {userRouter}