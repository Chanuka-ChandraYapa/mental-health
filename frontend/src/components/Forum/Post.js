import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

const Post = ({ post }) => {
  const [replies, setReplies] = useState(post.replies || []);
  const [newReply, setNewReply] = useState("");
  const { user, message, token } = useSelector((state) => state.user);

  const handleReplyChange = (e) => {
    setNewReply(e.target.value);
  };

  const handleReplySubmit = async () => {
    const reply = { content: newReply, userId: user.id, postId: post._id }; // Replace with actual user ID
    try {
      const response = await axios.post(
        "http://localhost:3002/posts/reply",
        reply
      );
      const updatedPost = response.data;

      // Update replies with the new reply from the server
      setReplies(updatedPost.replies);
      setNewReply("");
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" component="h3">
          {post.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {post.content}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          Posted by: {post.userName}
        </Typography>
        <Box sx={{ marginTop: 2 }}>
          {replies.map((reply, index) => (
            <Card key={index} sx={{ marginBottom: 1 }}>
              <CardContent>
                <Typography variant="body2">{reply.content}</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Posted by: {reply.userName}
                </Typography>
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
