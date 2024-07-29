const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
const taskRoutes = require('./routes/tasks');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes)

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Cron job to delete outdated tasks
cron.schedule('0 0 * * *', async () => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const result = await Task.deleteMany({ date: { $lt: today } });
    console.log(`${result.deletedCount} outdated tasks deleted`);
  } catch (error) {
    console.error('Error deleting outdated tasks:', error);
  }
});
