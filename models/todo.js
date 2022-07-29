const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  task: String,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {
  timestamps: true
});

module.exports = mongoose.model('Todo', todoSchema)