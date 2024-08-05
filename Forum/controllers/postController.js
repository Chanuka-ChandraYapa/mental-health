const Post = require("../models/Post");
const axios = require("axios");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createPost = async (req, res) => {
  const { title, content, userId } = req.body;
  try {
    const userResponse = await axios.post(
      `http://localhost:5001/api/users/userInfo`,
      req.body
    );
    const userName = userResponse.data.name;

    const newPost = new Post({
      title,
      content,
      userId,
      userName,
    });

    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addReply = async (req, res) => {
  const { content, userId, postId, replyId } = req.body;
  console.log("hi reply", req.body);
  try {
    const userResponse = await axios.post(
      `http://localhost:5001/api/users/userInfo`,
      req.body
    );
    const userName = userResponse.data.name;
    console.log("hi reply", userName);
    const findReplyAndUpdate = (replies, replyId, newReply) => {
      for (let reply of replies) {
        if (reply._id.toString() === replyId) {
          if (!reply.replies) {
            reply.replies = [];
          }
          reply.replies.push(newReply);
          console.log(replyId, reply._id);
          return true;
        }
        if (
          reply.replies &&
          findReplyAndUpdate(reply.replies, replyId, newReply)
        ) {
          console.log("nested reply called");
          return true;
        }
      }
      return false;
    };

    if (replyId) {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      const newReply = {
        _id: new ObjectId(), // Generate a new ObjectId for the reply
        content,
        userId,
        userName,
        date: Date.now(), // Set the current date
        upvotes: 0,
        downvotes: 0,
      };
      console.log(newReply);
      const updated = findReplyAndUpdate(post.replies, replyId, newReply);
      if (!updated) {
        console.log(res);
        return res.status(404).json({ message: "Reply not found" });
      }

      await post.save();
      res.json(post);
    } else {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      post.replies.push({ content, userId, userName });
      await post.save();

      const postUserId = post.userId;
      const notificationMessage = `Your post "${post.title}" has a new reply.`;
      await axios.post("http://localhost:4000/send-notification", {
        message: notificationMessage,
        userId: postUserId,
      });

      res.json(post);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const votePost = async (req, res) => {
  const { postId, userId, replyId, type } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const findReplyAndUpdateVotes = (replies, replyId, type) => {
      for (let reply of replies) {
        if (reply._id.toString() === replyId) {
          if (type === "upvote") {
            reply.upvotes += 1;
          } else if (type === "downvote") {
            reply.downvotes += 1;
          }
          return true;
        }
        if (findReplyAndUpdateVotes(reply.replies, replyId, type)) {
          return true;
        }
      }
      return false;
    };

    if (replyId) {
      const updated = findReplyAndUpdateVotes(post.replies, replyId, type);
      if (!updated) {
        return res.status(404).json({ message: "Reply not found" });
      }
    } else {
      if (type === "upvote") {
        post.upvotes += 1;
      } else if (type === "downvote") {
        post.downvotes += 1;
      }
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getPosts, createPost, addReply, votePost };
