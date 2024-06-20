import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      axios.get("http://localhost:3002/posts/getPosts").then((response) => {
        setPosts(response.data);
        console.log(response.data);
        setLoading(false);
      });
    } catch (error) {
      console.error("Error fetching Forum Posts", error);
      setLoading(false);
      setError(true);
    }
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

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="background.default"
        color="text.primary"
      >
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="background.default"
        color="text.primary"
        px={2}
      >
        <Typography variant="h4" color="primary.main" align="center">
          Something Went Wrong! Please Try Reloading
        </Typography>
      </Box>
    );
  }

  return (
    <Box bgcolor="background.default" color="text.primary" pt={5}>
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
