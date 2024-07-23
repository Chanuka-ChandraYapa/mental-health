import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useSelector } from "react-redux";
import Post from "./Post";
import Footer from "../Footer";

const PostDetails = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const [posts, setPosts] = useState(null);
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState("");
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
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
    <>
      <Box bgcolor="background.default" color="text.primary" pt={5}>
        <Card sx={{ marginBottom: 2 }}>
          <CardContent>
            {posts.map((post, index) => (
              <>{post._id == id && <Post key={index} post={post} />}</>
            ))}
          </CardContent>
        </Card>
      </Box>
      <Footer />
    </>
  );
};

export default PostDetails;
