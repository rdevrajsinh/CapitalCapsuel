const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  documents: [
    {
      name: String,
      status: { type: String, enum: ["Pending", "Submitted"], default: "Pending" },
    },
  ],
});

const Document = mongoose.model("Document", documentSchema);
module.exports = Document;
