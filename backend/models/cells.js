const mongoose = require('mongoose');

const cellSchema = new mongoose.Schema({
    cellId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    }
});

const Cell = mongoose.model('Cell', cellSchema);

module.exports = Cell;
