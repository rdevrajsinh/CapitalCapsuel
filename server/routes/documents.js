const express = require('express');
const Document = require('../models/Document');
const router = express.Router();

// Create or Update Documents for User (Bulk)
router.post('/', async (req, res) => {
    const { userId, documents } = req.body; // Extract userId and documents array from request body

    // Validate input
    if (!userId || !documents || !Array.isArray(documents)) {
        return res.status(400).json({ message: 'User ID and documents array are required.' });
    }

    try {
        // Check if the user already has a document entry in the database
        let userDocument = await Document.findOne({ userId });

        if (!userDocument) {
            // If no document entry exists for the user, create a new one
            userDocument = new Document({
                userId,
                documents // Save all the documents in one array
            });
        } else {
            // If the user exists, update the documents array for that user
            userDocument.documents = documents;
        }

        // Save or update the document entry
        await userDocument.save();

        res.status(201).json(userDocument);
    } catch (error) {
        console.error('Error creating or updating document:', error);
        res.status(500).json({ message: 'Failed to save document data.' });
    }
});

// Get Documents by User ID
router.get('/:userId', async (req, res) => {
    try {
        const userDocument = await Document.findOne({ userId: req.params.userId }); // Fetch document entry by userId
        if (!userDocument) {
            return res.status(404).json({ message: 'No documents found for this user.' });
        }
        res.json(userDocument);
    } catch (error) {
        console.error('Error retrieving documents:', error);
        res.status(500).json({ message: 'Failed to retrieve documents.' });
    }
});

module.exports = router;
