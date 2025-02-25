const mongoose = require('mongoose');

const CostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
  merchantBankerFees: { type: Number, default: 0 },
  legalFees: { type: Number, default: 0 },
  listingFees: { type: Number, default: 0 },
  otherExpenses: { type: Number, default: 0 },
});

module.exports = mongoose.model('Cost', CostSchema);