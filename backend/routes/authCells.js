const express = require("express");
const Cell = require("../models/cells"); // Import the Cell model
const authRouter = require("./auth");

const router = express.Router();

// Route to fetch existing cells
authRouter.get("/api/cells", async (req, res) => {
    try {
        const cells = await Cell.find(); // Retrieve all cells from the database
        res.json(cells); // Send the list of cells as a JSON response
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
