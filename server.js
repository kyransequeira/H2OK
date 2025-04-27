
const express = require('express');
const mongoose = require('mongoose');
const fountainRoutes = require('./routes/fountains');
const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/fountains', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/api/fountains', fountainRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
