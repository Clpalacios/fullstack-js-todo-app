const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: { type: String, required: [true, "A task description is required."] },
  completed: { type: Boolean }
});

module.exports = mongoose.model('Task', taskSchema, 'task');