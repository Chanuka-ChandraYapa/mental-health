const express = require("express");
const router = express.Router();
const {
  getPosts,
  createPost,
  addReply,
  votePost,
} = require("../controllers/postController");
const auth = require("../middleware/auth");

router.get("/getPosts", getPosts);
// router.post("/addPosts", auth, createPost);
router.post("/addPosts", createPost);
router.post("/reply", auth, addReply);
router.post("/vote", votePost);

module.exports = router;
