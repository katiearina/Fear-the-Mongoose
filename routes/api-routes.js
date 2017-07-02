// Dependencies
var request = require('request');
var cheerio = require('cheerio');

// Requiring our Article and Comment models
var Article = require("./../models/Article.js");
var Comment = require("./../models/Comment.js");
// =============================================================

module.exports = function (app) {

  app.get("/scrape", function(req, res) {

    // Make a request call to grab the HTML body from the site of your choice
    request('https://www.fearthefin.com/', function (error, response, html) {

      // Load the HTML into cheerio and save it to a variable
      var $ = cheerio.load(html);

        // Save an empty result object
        var result = {};

        var totalArticles;

      // Select each instance of the HTML body that you want to scrape
      // NOTE: Cheerio selectors function similarly to jQuery's selectors, 
      // but be sure to visit the package's npm page to see how it works
      $('h2').each(function(i, element){

        // Add the text and href of every link, and save them as properties of the result object
          result.title = $(element).children().text();
          result.link = $(element).children().attr("href");

          // Create a new entry using the Article model
          var article = new Article(result);

          article.save(function(error, doc) {
            if (error) {
              console.log(error);
            }

            else {
              // console.log(doc);
            }
          });

          totalArticles = i;

      });

    // Redirect to home page once scrape is complete
    console.log("Total number scraped: " + totalArticles);

    });
  
  // Tell the browser that we finished scraping the text
  console.log("Scrape Complete");
  res.redirect("/");
    
  });

  // app.get("/articles", function(req, res) {
  //   Article.find({}, function(error, doc) {
  //     if (error) {
  //       console.log(error);
  //     }
  //     else {
  //       res.render("index", {"articles": doc});
  //     }
  //   });
  // });

  // Grab an article by its ObjectId
  app.get("/articles/:id", function (req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db
    Article.findOne({ "_id": req.params.id })
    // ..and populate all of the comments associated with it
    .populate("comment")
    // now, execute our query
    .exec(function(error, doc) {
      if (error) {
        console.log(error);
      }
      else {
        // Otherwise, send the doc to the browser as a json object
        res.json(doc);
      }
    });
  });

  // Add comment to article
  app.post("/articles/:id", function (req, res) {
    var newComment = new Comment(req.body);
    // And save the new comment to the db
    newComment.save(function(error, doc) {
      if (error) {
        console.log(error);
      }
      else {
        // Use the article id to find and update its note
        Article.findOneAndUpdate({"_id": req.params.id}, { $push: {"comment": doc._id} })
        // Execute the above query
        .exec(function(error, doc) {
          if (error) {
            console.log(error)
          }
          else {
            // Send the document to the browser
            res.send(doc);
          }
        });
      }
    });
  });

  app.post("/saved/:id", function (req, res) {
    Article.findOneAndUpdate({"_id": req.params.id}, {"saved": true})
      .exec(function(error, doc) {
          if (error) {
              console.log(error);
          } 
          else {
              res.send(doc);
          }
      });
  });

  app.delete("/delete/:id", function (req, res) {
    Comment.remove({"_id": req.params.id}, function (error, doc) {
      if (error) {
        console.log(error);
      }
      else {
        console.log(req.params.id + " removed from database!");
      }
    });
  });

};