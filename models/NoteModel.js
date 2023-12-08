const mongoose = require('mongoose')

// note model
const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true, unique: true },
  user: { type: String, required: true },
}, {
    versionKey: false
})

const NoteModel = mongoose.model('note', noteSchema)

module.exports = {
   NoteModel,
}