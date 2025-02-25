
const express = require('express');
const Cost = require('../models/Cost');
const router = express.Router();

// Create Cost
router.post('/', async (req, res) => {
  const { userId, merchantBankerFees, legalFees, listingFees, otherExpenses } = req.body;
  const newCost = new Cost({ userId, merchantBankerFees, legalFees, listingFees, otherExpenses });
  await newCost.save();
  res.status(201).json(newCost);
});

// Get Cost
router.get('/:userId', async (req, res) => {
  const cost = await Cost.findOne({ userId: req.params.userId });
  res.json(cost);
});

module.exports = router;