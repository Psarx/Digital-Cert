const express = require("express");
const Cell = require("../models/cells");
const CellCoordinator = require("../models/cellCoordinator"); // Import the Cell model
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken module
const router = express.Router();

// Route to fetch existing cells
router.get("/api/cells", async (req, res) => {
    try {
        const cells = await Cell.find(); // Retrieve all cells from the database
        res.json(cells); // Send the list of cells as a JSON response
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to add a new cell
router.post("/api/cells", async (req, res) => {
    try {
        const { cellId, name } = req.body; // Extract cellId and name from request body

        // Create a new cell instance
        const newCell = new Cell({
            cellId,
            name
        });

        // Save the new cell to the database
        await newCell.save();

        // Send a success response
        res.status(201).json({ message: 'Cell added successfully', cell: newCell });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Route to add a new cell coordinator
router.post("/api/cell-coordinators", async (req, res) => {
    try {
        const { cellId, coordinatorId, coordinatorName } = req.body; // Extract data from request body


        // Create a new cell coordinator instance
        const newCellCoordinator = new CellCoordinator({
            cellId, // Manually set the ObjectId of the cell
            coordinatorId,
            coordinatorName
        });

        // Save the new cell coordinator to the database
        await newCellCoordinator.save();

        // Send a success response
        res.status(201).json({ message: 'Cell coordinator added successfully', cellCoordinator: newCellCoordinator });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
