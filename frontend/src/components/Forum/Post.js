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
import axios from "axios";
import { useSelector } from "react-redux";
import config from "../../config";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const Reply = ({ reply, handleVote, addReply }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleReplySubmit = async () => {
    console.log(reply._id, replyContent);
    await addReply(reply._id, replyContent);
    setReplyContent("");
    setShowReplyInput(false);
  };

  return (
    <Box>
      <Card key={reply._id} sx={{ marginBottom: 1 }}>
        <CardContent>
          <Typography variant="body1">{reply.content}</Typography>
          <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
            <Typography variant="subtitle2" color="textSecondary">
              Posted by: {reply.userName}
            </Typography>

            <IconButton
              onClick={() => handleVote(reply._id, "upvote")}
              color="default"
            >
              <ThumbUpIcon />
            </IconButton>
            <Typography variant="body2" color="textSecondary">
              {reply.upvotes || 0}
            </Typography>
            <IconButton
              onClick={() => handleVote(reply._id, "downvote")}
              color="default"
            >
              <ThumbDownIcon />
            </IconButton>
            <Typography variant="body2" color="textSecondary">
              {reply.downvotes || 0}
            </Typography>
          </Box>
          {reply.replies && reply.replies.length > 0 && (
            <Box sx={{ marginLeft: 2 }}>
              {reply.replies.map((nestedReply) => (
                <Reply
                  key={nestedReply._id}
                  reply={nestedReply}
                  handleVote={handleVote}
                  addReply={addReply}
                />
              ))}
            </Box>
          )}
          <Button onClick={() => setShowReplyInput(!showReplyInput)}>
            Reply
          </Button>
          {showReplyInput && (
            <Box>
              <TextField
                label="Reply"
                value={replyContent}
                onChange={handleReplyChange}
                fullWidth
                margin="normal"
                multiline
                rows={2}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleReplySubmit}
              >
                Submit
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

const Post = ({ post }) => {
  const [replies, setReplies] = useState(post.replies || []);
  const [newReply, setNewReply] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const [upvotes, setUpvotes] = useState(post.upvotes || 0);
  const [downvotes, setDownvotes] = useState(post.downvotes || 0);

  const handleReplyChange = (e) => {
    setNewReply(e.target.value);
  };

  const handleReplySubmit = async () => {
    const reply = { content: newReply, userId: user.id, postId: post._id };
    try {
      const response = await axios.post(`${config.forum}/posts/reply`, reply);
      const updatedPost = response.data;
      setReplies(updatedPost.replies);
      setNewReply("");
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  const handleVote = async (id, type) => {
    try {
      const response = await axios.post(`${config.forum}/posts/vote`, {
        postId: post._id,
        userId: user.id,
        replyId: id,
        type,
      });
      const updatedPost = response.data;
      setReplies(updatedPost.replies);
      setUpvotes(updatedPost.upvotes);
      setDownvotes(updatedPost.downvotes);
    } catch (error) {
      console.error(`Error ${type}ing post:`, error);
    }
  };

  const addNestedReply = async (replyId, content) => {
    try {
      const response = await axios.post(`${config.forum}/posts/reply`, {
        content,
        userId: user.id,
        postId: post._id,
        replyId,
      });
      console.log("Im waked");
      const updatedPost = response.data;
      setReplies(updatedPost.replies);
    } catch (error) {
      console.error("Error adding nested reply:", error);
    }
  };

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" component="h3" color="primary.main">
          {post.title}
        </Typography>
        <Divider variant="middle" sx={{ mt: 2, mb: 1 }} />
        <Typography variant="body1">{post.content}</Typography>
        <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
          <Typography variant="subtitle2" color="textSecondary">
            Posted by: {post.userName}
          </Typography>

          <IconButton
            onClick={() => handleVote(post._id, "upvote")}
            color="default"
          >
            <ThumbUpIcon />
          </IconButton>
          <Typography variant="body2" color="textSecondary">
            {upvotes}
          </Typography>
          <IconButton
            onClick={() => handleVote(post._id, "downvote")}
            color="default"
          >
            <ThumbDownIcon />
          </IconButton>
          <Typography variant="body2" color="textSecondary">
            {downvotes}
          </Typography>
        </Box>
        <Box sx={{ marginTop: 2 }}>
          {replies.map((reply) => (
            <Reply
              key={reply._id}
              reply={reply}
              handleVote={handleVote}
              addReply={addNestedReply}
            />
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
