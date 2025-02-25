const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const complianceRoutes = require("./routes/compliance");
const taskRoutes = require("./routes/tasks");
const costRoutes = require("./routes/cost");
const aiAnalysisRoutes = require("./routes/aiAnalysis");
const notificationRoutes = require("./routes/notifications");
const adminRoutes = require("./routes/admin");
const ipoRoutes = require("./routes/ipoRoutes");
const documentRoutes = require("./routes/ipodocroutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/compliance", complianceRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/cost", costRoutes);
app.use("/api/ai", aiAnalysisRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/ipo", ipoRoutes);
app.use("/api/documents", documentRoutes);

// Default route for health check
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Export Express app for Vercel serverless deployment
module.exports = app;
