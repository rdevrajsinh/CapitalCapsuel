const express = require('express');
const Notification = require('../models/Notification');
const router = express.Router();

// Create Notification
router.post('/', async (req, res) => {
  const { userId, message } = req.body;
  const newNotification = new Notification ({ userId, message });
  await newNotification.save();
  res.status(201).json(newNotification);
});

// Get Notifications
router.get('/:userId', async (req, res) => {
  const notifications = await Notification.find({ userId: req.params.userId });
  res.json(notifications);
});

module.exports = router;