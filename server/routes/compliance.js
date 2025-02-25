// routes/complianceRoutes.js
const express = require('express');
const Compliance = require('../models/Compliance');
const router = express.Router();

// Create Compliance
router.post('/', async (req, res) => {
    const { userId, complianceType, description, regulatoryBody, priority, dueDate, filingDate, approvalDate, remarks, attachments } = req.body;

    // Validate input
    if (!userId || !complianceType || !description || !regulatoryBody || !priority) {
        return res.status(400).json({ message: 'User  ID, compliance type, description, regulatory body, and priority are required.' });
    }

    try {
        const newCompliance = new Compliance({
            userId,
            complianceType,
            description,
            regulatoryBody,
            priority,
            dueDate,
            filingDate,
            approvalDate,
            remarks,
            attachments
        });
        await newCompliance.save();
        res.status(201).json(newCompliance);
    } catch (error) {
        console.error('Error creating compliance:', error);
        res.status(500).json({ message: 'Failed to create compliance.' });
    }
});

// Get Compliance by User ID
router.get('/:userId', async (req, res) => {
    try {
        const compliance = await Compliance.find({ userId: req.params.userId });
        res.json(compliance);
    } catch (error) {
        console.error('Error retrieving compliance:', error);
        res.status(500).json({ message: 'Failed to retrieve compliance.' });
    }
});

module.exports = router;