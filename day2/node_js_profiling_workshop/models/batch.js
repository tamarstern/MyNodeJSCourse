// Load required packages
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define our Batch schema
var BatchSchema = new mongoose.Schema({
    text: String,
    url: String,
    verb: String,
    payloads: String,
    status: { type: String, default: 'PENDING' },
    batchRes: [{ type: String }]
});

// Export the Mongoose model
module.exports = mongoose.model('Batch', BatchSchema);