// models/Compliance.js
const mongoose = require('mongoose');

const ComplianceSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // Unique ID of the user
    complianceType: { type: String, required: true }, // Type of compliance
    description: { type: String, required: true }, // Description of compliance
    regulatoryBody: { type: String, required: true }, // Regulatory body
    priority: { type: String, required: true }, // Priority level
    status: { type: String, default: 'Pending' }, // Current status
    dueDate: { type: Date, required: false }, // Due date for compliance
    filingDate: { type: Date, required: false }, // Filing date
    approvalDate: { type: Date, required: false }, // Approval date
    remarks: { type: String, required: false }, // Additional remarks
    attachments: { type: String, required: false } // File attachments
});

module.exports = mongoose.model('Compliance', ComplianceSchema);