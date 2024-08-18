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
  replies: [this],
});

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
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
  replies: [ReplySchema],
  date: {
    type: Date,
    default: Date.now,
  },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
});

module.exports = mongoose.model("Post", PostSchema);
