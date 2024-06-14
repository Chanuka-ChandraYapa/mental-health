const express = require("express");
const router = express.Router();
const {
  getPosts,
  createPost,
  addReply,
} = require("../controllers/postController");
const auth = require("../middleware/auth");

router.get("/getPosts", getPosts);
// router.post("/addPosts", auth, createPost);
router.post("/addPosts", createPost);
router.post("/reply", auth, addReply);

module.exports = router;
