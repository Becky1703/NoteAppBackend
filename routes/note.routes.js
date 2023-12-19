const express = require("express");
const jwt = require("jsonwebtoken");
const { authenticator } = require("../middlewares/authenticator");
const { NoteModel } = require("../models/NoteModel");

const noteRouter = express.Router()
noteRouter.use(authenticator)



const jwtSecret = process.env.JWT_SECRET || "defaultSecret";

noteRouter.get("/", (req, res) => {
  let token = req.headers.authorization;
  jwt.verify(token, jwtSecret, async (err, decode) => {
    try {
      if (err) {
        // Handle token verification errors
        console.error('Token verification error:', err);
        res.status(401).send({
          message: 'Unauthorized',
          status: 0,
        });
        return;
      }

      if (!decode || !decode.userId) {
        // Invalid token structure
        res.status(401).send({
          message: 'Invalid token',
          status: 0,
        });
        return;
      }

      let data = await NoteModel.find({ user: decode.userId });
      res.send({
        data: data,
        message: "All notes",
        status: 1,
      });
    } catch (error) {
      // Log the error for server-side debugging
      console.error('Internal server error:', error);
      res.status(500).send({
        message: 'Internal Server Error',
        status: 0,
      });

    }
  });
});


noteRouter.post("/create", async(req, res) => {
    try {
      let note = new NoteModel(req.body);  
      await note.save();
      res.send({
        message: "Note created",
        status: 1,
      });
    } catch (error) {
      console.error("Error", error)
      res.status(500).send({
        message: 'Internal Server Error',
        status: 0,
      });
    }
})




noteRouter.patch("/", async (req, res) => {
  let { id } = req.headers;
  try {
    await NoteModel.findByIdAndUpdate({ _id: id }, req.body);
    res.send({
      message: "Note updated",
      status: 1,
    });
  } catch (error) {
    console.error("Error:", error)
    res.status(500).send({
      message: 'Internal Server Error',
      status: 0,
    });
  }
});

/**
 * Deletes a user's note from the database.
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
      console.error("Error:", error);
      res.status(500).send({
        message: 'Internal Server Error',
        status: 0,
      });
    }
  });

  
module.exports = {
  noteRouter,
};