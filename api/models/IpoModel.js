const mongoose = require("mongoose");

const ipoSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    companyName: { type: String, required: true },
    netWorth: { type: Number, required: true },  // Eligibility check
    paidUpCapital: { type: Number, required: true },  // Eligibility check
    trackRecord: { type: Boolean, required: true },  // Eligibility check (at least 2 years)
    isEligible: { type: Boolean, default: false },  // Computed eligibility

    documentsSubmitted: { type: [String], default: [] },
    missingDocuments: { type: [String], default: [] },

    completedSteps: { type: [String], default: [] },
    totalSteps: { type: Number, default: 9 },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Ipo", ipoSchema);
