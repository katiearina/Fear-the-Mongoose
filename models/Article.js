// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create the Article schema
var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    link: {
        type: String,
        required: true,
        unique: true
    },
    scrapedDate: {
        type: Date,
        default: Date.now
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
});

// Create the Article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;