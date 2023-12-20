const express = require("express");
const jwt = require("jsonwebtoken");
const { authenticator } = require("../middlewares/authenticator");
const { NoteModel } = require("../models/NoteModel");

const noteRouter = express.Router()
noteRouter.use(authenticator)


//const jwtSecret = process.env.JWT_SECRET || "defaultSecret";

noteRouter.get("/",async(req,res)=>{
  let token = req.headers.authorization
  jwt.verify(token,"Becky1703",async(err,decode)=>{
      try {

          let data = await NoteModel.find({user:decode.userId})
          res.send({
              data:data,
              message:"Success",
              status:1
          })
      } catch (error) {
          res.send({
              message:error.message,
              status:0
          })
      }
  
      
  })

})


noteRouter.post("/create", async(req, res) => {
    try {
      let note = new NoteModel(req.body);  
      await note.save();
      res.status(200).send({
        message: "Note created successfuly",
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