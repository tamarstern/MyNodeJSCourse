// Load required packages
var express = require('express');
var bodyParser = require('body-parser');
var batchController = require('./controllers/batch');
var jobExecuter = require('./jobs/jobExecuter');
var mongoose = require('mongoose');

var config = require('config');

//db connection      
mongoose.connect(config.DBHost);
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /batchs
router.route('/batch')
  .post(batchController.postBatch)
  .get(batchController.getBatches);

// Create endpoint handlers for /batchs/:batch_id
router.route('/batch/:batch_id')
  .get(batchController.getBatch)

// Register all our routes with /api
app.use('/api', router);

jobExecuter.init();

// Start the server
app.listen(3000);

module.exports = app;