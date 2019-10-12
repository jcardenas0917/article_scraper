
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let CommentSchema = new Schema({
    comment: String,
    article: {
        type: Schema.Types.ObjectId,
        ref: "Article"
    }
});

let Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;