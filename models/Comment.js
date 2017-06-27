// Require mongoose
var mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;

// Create the Comment schema
var CommentSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: false
    },
    author: {
        type: String,
        trim: true,
        required: "Author is required."
    },
    body: {
        type: String,
        trim: true,
        required: "Comment body is required."
    },
    commentCreated: {
        type: Date,
        default: Date.now
    }
});

// Create the Comment model with the CommentSchema
var Comment = mongoose.model("Comment", CommentSchema);

// Export the Comment model
module.exports = Comment;