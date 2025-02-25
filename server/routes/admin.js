const express = require('express');
const Admin = require('../models/Admin');
const router = express.Router();

// Admin Signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const newAdmin = new Admin({ email, password });
  await newAdmin.save();
  res.status(201).json({ message: 'Admin created' });
});

// Admin Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(404).json({ message: 'Admin not found' });
  if (admin.password !== password) return res.status(400).json({ message: 'Invalid credentials' });
  res.json({ message: 'Login successful' });
});

module.exports = router;