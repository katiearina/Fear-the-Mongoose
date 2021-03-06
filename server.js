// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var expresshandlebars = require("express-handlebars");
var path = require("path");
// =============================================================

// Scraping
var request = require("request");
var cheerio = require("cheerio");

// Require Article and Comment models
var Article = require("./models/Article.js");
var Comment = require("./models/Comment.js");

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

var herokuDB = process.env.MONGODB_URI;
var localDB = "mongodb://localhost/fearthemongoosedb";
var db = mongoose.connection;

if (herokuDB) {
  mongoose.connect(herokuDB);
}
else {
  mongoose.connect(localDB);
  // Show any mongoose errors
  db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
  });

  // Once logged in to the db through mongoose, log a success message
  db.once("open", function() {
    console.log("Mongoose connection successful!");
  });
}

// Declare Handlebars path for layout
app.engine("handlebars", expresshandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them
  // *TO DO*
  // INSERT ROUTES HERE! (Make sure they are exported).
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// =============================================================
// Starts the server listening
app.listen(PORT, function() {
  console.log("Jumping in to the Shark Tank on PORT " + PORT + "!");
});
