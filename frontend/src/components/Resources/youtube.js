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
  TextField,
} from "@mui/material";
import renderSkeleton from "../../utils/cardSkeleton";

// const API_KEY = "AIzaSyCchb1_foc6i6AZ1AwKmwFEWOKwAJYHbgo";
const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
// const CHANNEL_ID = "UCQQlEkh6Znhos-f8HIcsAlw";
const CHANNEL_ID = "UCnQwVeCY42UMfyKE1T9y_2Q";
const MAX_RESULTS = 12;

const YouTubeEmbed = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVideos, setFilteredVideos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        if (localStorage.getItem("videos")) {
          const response = JSON.parse(localStorage.getItem("videos"));
          setVideos(response);
          setFilteredVideos(response);
          setLoading(false);
          return;
        }
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`
        );
        setVideos(response.data.items);
        localStorage.setItem("videos", JSON.stringify(response.data.items));
        setFilteredVideos(response.data.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching YouTube videos", error);
        setLoading(false);
        setError(true);
      }
    };

    fetchVideos();
  }, []);

  // useEffect(() => {
  //   const fetchVideos = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`
  //       );

  //       const videoIds = response.data.items.map(item => item.id.videoId).join(',');
  //       const detailsResponse = await axios.get(
  //         `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=contentDetails`
  //       );

  //       const filteredVideos = response.data.items.filter(video => {
  //         const videoDetail = detailsResponse.data.items.find(detail => detail.id === video.id.videoId);
  //         const duration = videoDetail ? videoDetail.contentDetails.duration : '';
  //         return duration && !/^PT(?:0M(?:[0-5]?[1-9]S|[1-5]?[0-9]S)?|1M0S)$/.test(duration); // Filter out videos less than 60 seconds
  //       });

  //       setVideos(filteredVideos);
  //       setFilteredVideos(filteredVideos); // Set initial filtered videos to be all videos
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching YouTube videos", error);
  //       setLoading(false);
  //       setError(true);
  //     }
  //   };

  //   fetchVideos();
  // }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredVideos(
      videos.filter(
        (video) =>
          video.snippet.title.toLowerCase().includes(query) ||
          video.snippet.description.toLowerCase().includes(query)
      )
    );
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
        p={4}
        mt={4}
      >
        {/* <CircularProgress /> */}
        {renderSkeleton()}
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
    <Box bgcolor="background.default" pt={5} p={4} mt={4}>
      <Typography variant="h4" gutterBottom color="text.primary">
        Mental Health Care Videos
      </Typography>
      <Box mb={3}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search videos"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Box>
      <Grid container spacing={3}>
        {filteredVideos.map((video) => (
          <Grid item xs={12} md={6} lg={4} key={video.id.videoId}>
            <Card sx={{ height: 350, overflow: "hidden" }}>
              <CardContent
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {video.snippet.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {video.snippet.description}
                </Typography>
                <Box sx={{ marginTop: "10px" }}>
                  <iframe
                    width="100%"
                    height="250"
                    src={`https://www.youtube.com/embed/${video.id.videoId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={video.snippet.title}
                  ></iframe>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default YouTubeEmbed;
