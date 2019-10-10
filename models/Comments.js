
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let CommentSchema = new Schema({
    author: {
        type: String
    },
    body: {
        type: String
    }
});

let Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;