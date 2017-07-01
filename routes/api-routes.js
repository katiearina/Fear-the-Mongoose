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

      // Select each instance of the HTML body that you want to scrape
      // NOTE: Cheerio selectors function similarly to jQuery's selectors, 
      // but be sure to visit the package's npm page to see how it works
      $('h2').each(function(i, element){

        // Save an empty result object
        var result = {};

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
              console.log(doc);
            }    
          });

      });
    });

    // Redirect to home page once scrape is complete
    res.redirect("/");

  });

};