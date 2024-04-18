const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const authRouter = require('./routes/auth.js');
const router = require('./routes/authCells.js');
const uploadRoutes = require('./routes/upload.js');

const app = express();
const PORT = process.env.PORT || 3000;
const DB = process.env.DB;

// MongoDB connection
mongoose.connect(DB)
  .then(() => {
    console.log('DB connection successful');
  })
  .catch(err => {
    console.error('DB connection failed:', err);
  });

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

 // Change the destination folder as needed
 app.use(uploadRoutes);
// Endpoint for uploading CSV files

// Mount authentication routes
app.use(authRouter);
app.use(router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
