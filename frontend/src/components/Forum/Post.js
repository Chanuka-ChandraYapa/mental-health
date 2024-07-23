import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  Divider,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import axios from "axios";
import { useSelector } from "react-redux";

const Post = ({ post }) => {
  const [replies, setReplies] = useState(post.replies || []);
  const [newReply, setNewReply] = useState("");
  const { user } = useSelector((state) => state.user);
  const [likes, setLikes] = useState(post.likes || 0);
  const [liked, setLiked] = useState(false); // Track if the user has liked the post

  const handleReplyChange = (e) => {
    setNewReply(e.target.value);
  };

  const handleReplySubmit = async () => {
    const reply = { content: newReply, userId: user.id, postId: post._id };
    try {
      const response = await axios.post(
        "http://localhost:3002/posts/reply",
        reply
      );
      const updatedPost = response.data;
      setReplies(updatedPost.replies);
      setNewReply("");
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await axios.post(
        liked
          ? "http://localhost:3002/posts/unlike"
          : "http://localhost:3002/posts/like",
        { postId: post._id, userId: user.id }
      );
      setLikes(response.data.likes);
      setLiked(!liked);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleReplyLike = async (replyId) => {
    try {
      const response = await axios.post("http://localhost:3002/replies/like", {
        replyId,
        userId: user.id,
      });
      const updatedReplies = replies.map((reply) => {
        if (reply._id === replyId) {
          return { ...reply, likes: response.data.likes };
        }
        return reply;
      });
      setReplies(updatedReplies);
    } catch (error) {
      console.error("Error liking reply:", error);
    }
  };

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" component="h3" color="primary.main">
          {post.title}
        </Typography>
        <Divider variant="middle" sx={{ mt: 2, mb: 1 }} />
        <Typography variant="h6" color="textSecondary">
          {post.content}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
          <Typography variant="subtitle2" color="textSecondary">
            Posted by: {post.userName}
          </Typography>

          <IconButton
            onClick={handleLike}
            color={liked ? "primary" : "default"}
          >
            <ThumbUpIcon />
          </IconButton>
          <Typography variant="body2" color="textSecondary">
            {likes}
          </Typography>
        </Box>
        <Box sx={{ marginTop: 2 }}>
          {replies.map((reply, index) => (
            <Card key={index} sx={{ marginBottom: 1 }}>
              <CardContent>
                <Typography variant="body2">{reply.content}</Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", marginTop: 1 }}
                >
                  <Typography variant="subtitle2" color="textSecondary">
                    Posted by: {reply.userName}
                  </Typography>

                  <IconButton
                    onClick={() => handleReplyLike(reply._id)}
                    color="default"
                  >
                    <ThumbUpIcon />
                  </IconButton>
                  <Typography variant="body2" color="textSecondary">
                    {reply.likes || 0}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
        <TextField
          label="Reply"
          value={newReply}
          onChange={handleReplyChange}
          fullWidth
          margin="normal"
          multiline
          rows={2}
        />
        <Button variant="contained" color="primary" onClick={handleReplySubmit}>
          Reply
        </Button>
      </CardContent>
    </Card>
  );
};

export default Post;
