const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  date: { type: String, required: true }, // Ensure this is stored as a string in 'YYYY-MM-DD' format
  startTime: { type: String },
  endTime: { type: String },
  isImportant: { type: Boolean, default: false },
  completed: { type: Boolean, default: false }
});

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

module.exports = Task;
