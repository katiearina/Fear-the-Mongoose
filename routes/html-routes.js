// Require Article and Comment models
var Article = require("../models/Article.js");
var Comment = require("../models/Comment.js");

module.exports = function(app) {

    app.get("/", function(req, res) {
        Article.find({}, null, {sort: '-scrapedDate'}, function(error, doc) {
            if (error) {
                res.send(error);
            }
            else {
                res.render("index", {"articles": doc});
            }
        });
    });

    app.get("/saved", function (req, res) {
        Article.find({}, function(error, doc) {
            if (error) {
                res.send(error);
            }
            else {
                res.render("saved", {"articles": doc});
            }
        });
    });

};