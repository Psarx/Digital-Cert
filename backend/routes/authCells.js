const express = require("express");
const Cell = require("../models/cells");
const CellCoordinator = require("../models/cellCoordinator"); // Import the Cell model
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken module
const router = express.Router();

// Route to fetch existing cells
router.get("/api/cells", async (req, res) => {
    try {
        const cells = await Cell.find();
        res.json(cells);
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
        const { cellName, coordinatorId, coordinatorName } = req.body; // Extract data from request body

        // Find the cell with the given name
        const cell = await Cell.findOne({ name: cellName });
        if (!cell) {
            return res.status(404).json({ message: 'Cell not found' });
        }

        // Create a new cell coordinator instance with the found cellId
        const newCellCoordinator = new CellCoordinator({
            cellId: cell._id,
            cellName,
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
