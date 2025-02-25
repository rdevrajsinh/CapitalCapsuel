const express = require("express");
const Document = require("../models/ipodoc");

const router = express.Router();

// Get all documents for a user
router.get("/:userId", async (req, res) => {
  try {
    const documentStatus = await Document.findOne({ userId: req.params.userId });
    res.json(documentStatus || { userId: req.params.userId, documents: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update document status
router.put("/:userId", async (req, res) => {
  try {
    const { documents } = req.body;
    let documentStatus = await Document.findOne({ userId: req.params.userId });

    if (!documentStatus) {
      documentStatus = new Document({ userId: req.params.userId, documents });
    } else {
      documentStatus.documents = documents;
    }

    await documentStatus.save();
    res.json({ message: "Document status updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
