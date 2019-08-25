const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: { type: String, required: true },
  completed: { type: Boolean }
});

module.exports = mongoose.model('Task', taskSchema);