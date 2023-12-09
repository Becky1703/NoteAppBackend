const express = require("express");
const jwt = require("jsonwebtoken");
const { authenticator } = require("../middlewares/authenticator");
const { NoteModel } = require("../models/NoteModel");

const noteRouter = express.Router()
noteRouter.use(authenticator)

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
 * Updates a note in the database.
 * and sends a success message if the note is updated.
 * if the note is not found, it sends an error message.
 * 
 * @param {string}
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
 * Deletes a note in the database.
 * and sends a success message if the note is deleted.
 * if the note is not found, it sends an error message.
 * 
 * @param {string}
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