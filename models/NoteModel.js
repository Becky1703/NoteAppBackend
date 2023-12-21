const mongoose = require('mongoose')

// note model
const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true, unique: true },
  user: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null }
}, {
    versionKey: false
})

const NoteModel = mongoose.model('note', noteSchema)

module.exports = {
   NoteModel,
}