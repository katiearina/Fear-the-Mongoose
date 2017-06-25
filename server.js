
// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var expresshandlebars = require("express-handlebars");

// Scraping
var request = require("request");
var cheerio = require("cheerio");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Initialize Express
var app = express();
var PORT = process.env.PORT || 8080;

// Use morgan (for logging) and body parser
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Path for static content
app.use(express.static(path.join(__dirname, "public")));

// MongoDB URI string
var mongodbURI = "mongodb://heroku_t1vmzwp0:e3ru7ge9a69mssc3h8frn3kvdp@ds139242.mlab.com:39242/heroku_t1vmzwp0"

// Database configuration with mongoose
// *TO DO*
// Switch to URI connection before deploying.
// mongoose.connect(mongodbURI);
mongoose.connect("mongodb://localhost/fearthemongoosedb");

var db = mongoose.connection;

// Declare Handlebars path for layout
app.engine("handlebars", expresshandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them
// *TO DO*
// INSERT ROUTES HERE! (Make sure they are exported).


// Listen on port 8080
app.listen(PORT, function() {
  console.log("Jumping in to the Shark Tank on PORT " + PORT + "!");
});
