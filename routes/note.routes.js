const express = require("express");
const jwt = require("jsonwebtoken");
const { authenticator } = require("../middlewares/authenticator");
const { NoteModel } = require("../models/NoteModel");

const noteRouter = express.Router()
noteRouter.use(authenticator)

/**
 * @swagger
 * tags:
 *   name: Note
 *   description: The notes managing API
 */


/**
 * @swagger
 * /note:
 *   get:
 *       summary: Returns all notes.
 *       tags: [Note]
 *       responses:
 *            200:
 *                description: The list of the notes
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: array
 *                            items:
 *                                 $ref: '#/components/schemas/Note'
 *            400:
 *                description: Bad request
 *                content:
 *                    application/json: 
 *                        schema:
 *                            $ref: '#/components/schemas/Error'
 *            401:
 *                description: Unauthorized
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/Error'
 *            500:
 *                description: Internal server error
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/Error'
 * 
 */
noteRouter.get("/", (req, res) => {
  let token = req.headers.authorization;
  jwt.verify(token, "Becky1703", async (err, decode) => {
    try {
      let data = await NoteModel.find({ user: decode.userId });
      res.send({
        data: data,
        message: "All notes",
        status: 1,
      });
    } catch (error) {
      res.send({
        message: error.message,
        status: 0,
      });

    }
  })
});

/**
 * @swagger
 * components:
 *    schemas:
 *      Note:
 *        type: object
 *        required:
 *          - title
 *          - user
 *          - body
 *          - createdAt
 *        properties:
 *          title:
 *            type: string
 *            description: The title of the note.
 *            example: "Sample Note"
 *          user:
 *            type: string
 *            description: The ID of the user who created the note.
 *            example: "622b8c0c5c5d6c5d6c5d6c5d6c5d6c5d6c5d6c5d6c5d6c5d6c5d6c5d6c5d"
 *          body:
 *            type: string
 *            description: The body of the note.
 *            example: "This is a sample note."
 *          createdAt:
 *            type: string
 *            description: The date and time when the note was created.
 *            example: "2023-05-17T10:00:00.000Z"
 *        example:
 *            title: "Sample Note"
 *            user: "622b8c0c5c5d6c5d6c5d6c5d6c5d6c5d6c5d6c5d6c5d6c5d6c5d6c5d6c5d"
 *            body: "This is a sample note."
 *            createdAt: "2023-05-17T10:00:00.000Z"
 *      Error:
 *        type: object
 *        required:
 *          - message
 *          - status
 *        properties:
 *          message:
 *            type: string
 *            description: The error message.
 *            example: "Error message"
 *          status:
 *            type: integer
 *            description: The HTTP status code.
 *            example: 500
 *        example:
 *            message: "Error message"
 *            status: 500
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *        properties:
 *          name:
 *            type: string
 *            description: The name of the user.
 *            example: "John Doe"
 *          email:
 *            type: string
 *            description: The email address of the user.
 *            example: "johndoe@example.com"
 *          password:
 *            type: string
 *            description: The password of the user.
 *            example: "XXXXXXXXXXX"
 *        example:
 *            name: "John Doe"
 *            email: "johndoe@example.com"
 *            password: "XXXXXXXXXXX"
 *      Login:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          email:
 *            type: string
 *            description: The email address of the user.
 *            example: "johndoe@example.com"
 *          password:
 *            type: string
 *            description: The password of the user.
 *            example: "XXXXXXXXXXX"
 *        example:
 *            email: "johndoe@example.com"
 *            password: "XXXXXXXXXXX"
 *      Token:
 *        type: object
 *        required:
 *          - token
 *        properties:
 *          token:
 *            type: string
 *            description: The JWT token.
 *            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb2VAZ21haWwuY29tIiwiaWF0IjoxNjcxMTQy
 *                      ODk0LCJleHAiOjE2NzE1NDg4OTQsIm5iZiI6MTY3MTE0Njg5NCwic3ViIjoiaW52YWxpZEBnbWFpbC5jb20iLCJ"
 *        example:
 *            token: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
 *                    
 * 
 * 
 */

/**
 * @swagger
 * /note/create:
 *   post:
 *        summary: Creates a new note.
 *        tags: [Note]
 *        responses:
 *            200:
 *                description: Creates a new note with the given title, user, body, and createdAt.
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/Note'
 *            responses:
 *                200:
 *                    description: The note was successfully created
 *                    content:
 *                        application/json:
 *                            schema: 
 *                                $ref: '#/components/schemas/Note'
 *                400:
 *                    description: Bad request
 *                    content:
 *                        application/json:
 *                            schema:
 *                                $ref: '#/components/schemas/Error'
 *                401:
 *                    description: Unauthorized
 *                    content:
 *                        application/json:
 *                            schema:
 *                                $ref: '#/components/schemas/Error'
 *                500:
 *                    description: Internal server error
 *                    content:
 *                        application/json:
 *                            schema:
 *                                $ref: '#/components/schemas/Error'
 *            security:
 *                - bearerAuth: []
 *            requestBody:
 *                required: true
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                title:
 *                                    type: string
 *                                    description: The title of the note.
 *                                    example: "Sample Note"
 *                                user: 
 *                                    type: string
 *                                    description: The ID of the user who created the note.
 *                                    example: "622b8c0c5c5d6c5d6c5d6c5d6c5d6c5d6c5d6c5d6c5d6c5d6c5d6c5d6c5d"
 *                                body:
 *                                    type: string
 *                                    description: The content of the note.
 *                                    example: "This is a sample note."
 *                                createdAt:
 *                                    type: string
 *                                    description: The date and time when the note was created.
 *                                    example: "2022-12-31T23:59:59.999Z"
 *                                updatedAt:
 *                                    type: string
 *                                    description: The date and time when the note was last updated.
 *                                    example: "2022-12-31T23:59:59.999Z" 
 */

noteRouter.post("/create", async(req, res) => {
    try {
      let note = new NoteModel(req.body);  
      await note.save();
      res.send({
        message: "Note created",
        status: 1,
      });
    } catch (error) {
      res.send({
        message: error.message,
        status: 0,
      });
    }
})


/**
 * @swagger
 * /note/:
 *   patch:
 *        summary: Updates a note.
 *        tags: [Note]
 *        responses:
 *            200:
 *                description: Updates a note with the given title, user, body, and createdAt.
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/Note'
 *            responses:
 *                200:
 *                    description: The note was successfully updated
 *                    content:
 *                        application/json:
 *                            schema: 
 *                                $ref: '#/components/schemas/Note'
 *                400:  
 *                    description: Bad request
 *                    content:
 *                        application/json:
 *                            schema:
 *                                $ref: '#/components/schemas/Error'
 *                401:
 *                    description: Unauthorized
 *                    content:
 *                        application/json:
 *                            schema:
 *                                $ref: '#/components/schemas/Error'
 *                500:
 *                    description: Internal server error
 *                    content:
 *                        application/json:
 *                            schema:
 *                                $ref: '#/components/schemas/Error'
 *            security:
 *                - bearerAuth: []
 *            requestBody:
 *                required: true
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                title:
 *                                    type: string
 *                                    description: The title of the note.
 *                                    example: "Sample Note"
 *                                user:
 *                                    type: string
 *                                    description: The ID of the user who created the note.
 *                                    example: "622b8c0c5c5d6c5d6c5d6c5d6c5d6c5d6c5d6c5d6c5d6c5d6c5d6c5d"
 *                                body:
 *                                    type: string
 *                                    description: The content of the note.
 *                                    example: "This is a sample note."
 *                                createdAt:
 *                                    type: string
 *                                    description: The date and time when the note was created.
 *                                    example: "2022-12-31T23:59:59.999Z"
 *                                updatedAt:
 *                                  type: string
 *                                  description: The date and time when the note was last updated.
 *                                  example: "2022-12-31T23:59:59.999Z"
 */
noteRouter.patch("/", async (req, res) => {
  let { id } = req.headers;
  try {
    await NoteModel.findByIdAndUpdate({ _id: id }, req.body);
    res.send({
      message: "Note updated",
      status: 1,
    });
  } catch (error) {
    res.send({
      message: error.message,
      status: 0,
    });
  }
});

/**
 * @swagger
 * /note/:
 *   delete:
 *          summary: Deletes a note.
 *          tags: [Note]
 *          responses:
 *              200:
 *                  description: Deletes a note with the given ID.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Note'
 *              responses:
 *                  200:
 *                      description: The note was successfully deleted
 *                      content:
 *                          application/json:
 *                              schema: 
 *                                  $ref: '#/components/schemas/Note'
 *                  400:
 *                      description: Bad request
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/components/schemas/Error'
 *                  401:
 *                      description: Unauthorized
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/components/schemas/Error'
 *                  500:
 *                      description: Internal server error
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/components/schemas/Error'
 *              security:
 *                 - bearerAuth: []
 *              requestBody:
 *                  required: true
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties: 
 *                                  id:
 *                                     type: string
 *                                     description: The ID of the note to be deleted.
 *                                     example: "622b8c0c5c5d6c5d6c5d6c5d6c5d6c5d6c5d6c5d6c5d6c5d6c5d6c5d"
 *                                  title:
 *                                        type: string
 *                                        description: The title of the note.
 *                                        example: "Sample Note"
 *                                  user: 
 *                                       type: string
 *                                       description: The ID of the user who created the note.
 *                                       example: "622b8c0c5c5d6c5d6c5d6c5d6c5d6c5d6c5d6c5d6c5d6c5d6c5d6c5d"
 *                                  body: 
 *                                      type: string
 *                                      description: The content of the note.
 *                                      example: "This is a sample note."
 *                                           
 */
noteRouter.delete("/", async (req, res) => {
    let { id } = req.headers;
    try {
      await NoteModel.findByIdAndDelete({ _id: id });
      res.send({
        message: "Note Deleted",
        status: 1,
      });
    } catch (error) {
      res.send({
        message: error.message,
        status: 0,
      });
    }
  });

  
module.exports = {
  noteRouter,
};