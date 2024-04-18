// models/participation.js
const mongoose = require('mongoose');

// Define the schema for participation details
const participationSchema = new mongoose.Schema({
    name: String,
    email: String,
    uuid: String
});

// Create the Participation model
const Participation = mongoose.model('Participation', participationSchema);

module.exports = Participation;
