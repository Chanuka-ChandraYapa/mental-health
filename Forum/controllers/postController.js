const Post = require("../models/Post");
const axios = require("axios");

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
  const { content, userId, postId } = req.body;
  console.log("hi reply", req.body);
  try {
    const userResponse = await axios.post(
      `http://localhost:5001/api/users/userInfo`,
      req.body
    );
    const userName = userResponse.data.name;
    console.log("hi reply", userName);
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.replies.push({ content, userId, userName });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getPosts, createPost, addReply };
