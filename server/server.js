const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
//const documentRoutes = require('./routes/documents');
const complianceRoutes = require('./routes/compliance');
const taskRoutes = require('./routes/tasks');
const costRoutes = require('./routes/cost');
const aiAnalysisRoutes = require('./routes/aiAnalysis');
const notificationRoutes = require('./routes/notifications');
const adminRoutes = require('./routes/admin');
const ipoRoutes = require("./routes/ipoRoutes");
const documentRoutes = require("./routes/ipodocroutes");





const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
//app.use('/api/documents', documentRoutes);
app.use('/api/compliance', complianceRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/cost', costRoutes);
app.use('/api/ai', aiAnalysisRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ipo', ipoRoutes);
app.use("/api/documents", documentRoutes);





// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});