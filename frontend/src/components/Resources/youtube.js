// src/components/YouTubeEmbed.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  Box,
} from "@mui/material";

// const API_KEY = "AIzaSyCchb1_foc6i6AZ1AwKmwFEWOKwAJYHbgo";
const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const CHANNEL_ID = "UCQQlEkh6Znhos-f8HIcsAlw"; // Example channel ID for mental health videos
const MAX_RESULTS = 12;

const YouTubeEmbed = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`
        );
        setVideos(response.data.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching YouTube videos", error);
        setLoading(false);
        setError(true);
      }
    };

    fetchVideos();
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
    <Box bgcolor="background.default" pt={5}>
      <Typography variant="h4" gutterBottom color="text.primary">
        Mental Health Care Videos
      </Typography>
      <Grid container spacing={3}>
        {videos.map((video) => (
          <Grid item xs={12} md={6} lg={4} key={video.id.videoId}>
            <Card>
              <CardContent>
                <Typography variant="h6">{video.snippet.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {video.snippet.description}
                </Typography>
                <div style={{ marginTop: "10px" }}>
                  <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${video.id.videoId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={video.snippet.title}
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default YouTubeEmbed;
