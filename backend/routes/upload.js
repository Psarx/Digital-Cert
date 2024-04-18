const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Define multer upload middleware
const { processCSV } = require('../utils/csvProcessor');
 // Import processCSV function

router.post('/upload', upload.single('csvFile'), async (req, res) => {
    const filePath = req.file.path; // Assuming you're using multer or similar for file upload

    try {
        const result = await processCSV(filePath);
        res.status(200).json(result); // Send the generated UUIDs in the response
    } catch (error) {
        console.error('Error processing CSV:', error);
        res.status(500).json({ error: 'Failed to process CSV file' });
    }
});

module.exports = router;
