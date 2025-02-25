const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Create Task
router.post('/', async (req, res) => {
  const { userId, taskDescription, dueDate } = req.body;
  const newTask = new Task({ userId, taskDescription, dueDate }); await newTask.save(); res.status(201).json(newTask); });

// Get Tasks router.get('/:userId', async (req, res) => { const tasks = await Task.find({ userId: req.params.userId }); res.json(tasks); });

module.exports = router;