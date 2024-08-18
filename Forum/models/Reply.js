const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReplySchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  parentId: {
    // Reference to the parent reply
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reply",
    default: null,
  },
  postId: {
    // Reference to the post
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
});

module.exports = mongoose.model("Reply", ReplySchema);
