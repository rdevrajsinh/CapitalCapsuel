const express = require("express");
const router = express.Router();
const Ipo = require("../models/IpoModel");

// 📌 Create IPO and check eligibility
router.post("/create", async (req, res) => {
    try {
        const { userId, companyName, netWorth, paidUpCapital, trackRecord, documentsSubmitted } = req.body;

        // Define all required documents
        const allDocuments = [
            "Business Plan",
            "Financial Statements",
            "Corporate Governance Report",
            "SEBI Approval",
            "Draft Red Herring Prospectus (DRHP)",
            "Minutes of Meetings",
            "Articles of Association",
            "Internal Approvals"
        ];

        // Check which documents are missing
        const missingDocuments = allDocuments.filter(doc => !documentsSubmitted.includes(doc));

        // Eligibility check
        const isEligible = netWorth >= 10000000 && paidUpCapital >= 10000000 && trackRecord; // Example condition

        const newIpo = new Ipo({
            userId,
            companyName,
            netWorth,
            paidUpCapital,
            trackRecord,
            isEligible,
            documentsSubmitted,
            missingDocuments,
            completedSteps: isEligible ? ["Assessing Suitability"] : []
        });

        await newIpo.save();
        res.status(201).json({ success: true, newIpo });

    } catch (error) {
        console.error("Error creating IPO:", error);
        res.status(500).json({ message: "Server error while creating IPO." });
    }
});

// 📌 Fetch IPO Roadmap
router.get("/roadmap/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const ipoData = await Ipo.findOne({ userId });

        if (!ipoData) {
            return res.status(404).json({ message: "No IPO roadmap found for this user." });
        }

        // Define IPO Steps
        const allSteps = [
            "Assessing Suitability",
            "Appointment of Merchant Banker",
            "SME IPO Application",
            "Drafting of Prospectus (DRHP)",
            "Red Herring Prospectus (RHP)",
            "Roadshow",
            "SME IPO Launch",
            "SME IPO Allocation",
            "SME IPO Listing"
        ];

        // Get remaining steps
        const remainingSteps = allSteps.filter(step => !ipoData.completedSteps.includes(step));

        res.json({
            companyName: ipoData.companyName,
            isEligible: ipoData.isEligible,
            completedSteps: ipoData.completedSteps,
            remainingSteps,
            progress: Math.round((ipoData.completedSteps.length / allSteps.length) * 100)
        });

    } catch (error) {
        console.error("Error fetching roadmap:", error);
        res.status(500).json({ message: "Server error while fetching IPO roadmap." });
    }
});

module.exports = router;
