const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
  taskDescription: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['Completed', 'Pending'], default: 'Pending' },
});

module.exports = mongoose.model('Task', TaskSchema);