const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    filename: String,
    path: String,
    mimetype: String,
    size: Number,
    uploadedAt: { type: Date, default: Date.now }
});

const Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;
