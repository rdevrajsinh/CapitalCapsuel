// models/Document.js
const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
    documents: [
      {
          name: { type: String, required: true },  // Document name
          status: { type: Boolean, default: false }, // Status of the document
      }
  ]
});

module.exports = mongoose.model('Document', DocumentSchema);