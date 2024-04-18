const mongoose = require('mongoose');

const cellCoordinatorSchema = new mongoose.Schema({
    cellId: {
        type: String,
        required: true
    },
    coordinatorId: {
        type: String,
        required: true
    },
    coordinatorName: {
        type: String,
        required: true
    }
});

const CellCoordinator = mongoose.model('CellCoordinator', cellCoordinatorSchema);

module.exports = CellCoordinator;
