import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import Post from "./Post";
import { useSelector } from "react-redux";

const Forum = () => {
  const { user, message, token } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    userId: "",
  });

  useEffect(() => {
    axios.get("http://localhost:3002/posts/getPosts").then((response) => {
      setPosts(response.data);
      console.log(response.data);
    });
  }, []);

  const handleChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Replace 'userId' with actual user ID from authentication context
    console.log(user);
    const userId = user.id; // Example user ID
    console.log("this is", userId);

    axios
      .post("http://localhost:3002/posts/addPosts", { ...newPost, userId })
      .then((response) => {
        setPosts([...posts, response.data]);
        setNewPost({ title: "", content: "", userId: "" });
      });
  };

  return (
    <Box>
      <Typography variant="h4" component="h2" gutterBottom>
        Community Forum
      </Typography>
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
      <Card sx={{ marginBottom: 2 }}>
        <CardContent>
          <TextField
            label="Title"
            name="title"
            value={newPost.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Content"
            name="content"
            value={newPost.content}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Post
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Forum;
