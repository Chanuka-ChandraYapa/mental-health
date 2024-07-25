import React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const CrisisInterventionMessage = () => (
  <Paper
    sx={{ padding: "20px", backgroundColor: "#ff5722", minHeight: "140px" }}
  >
    <Typography variant="h6" gutterBottom>
      1926 - Crisis Intervention
    </Typography>
    <Typography variant="body1">
      National Mental Health Helpline is dedicated to providing 24/7, free and
      confidential support by phone and text message (SMS).{" "}
      <strong>1926</strong>
    </Typography>
    <Typography
      variant="body1"
      component={Link}
      sx={{
        textDecoration: "none",
        color: "White",
        "&:hover": {
          color: "primary.main",
        },
      }}
      to="https://nimh.health.gov.lk/en/1926-national-mental-health-helpline/#:~:text=1926%20%2D%20National%20Mental%20Health%20Helpline,of%20Mental%20Health%2C%20Sri%20Lanka"
    >
      {" "}
      Learn More{" "}
    </Typography>
  </Paper>
);

const SupportCommunityMessage = () => (
  <Paper
    sx={{ padding: "20px", backgroundColor: "#64b5f6", minHeight: "140px" }}
  >
    <Typography variant="h6" gutterBottom>
      Support Community
    </Typography>
    <Typography variant="body1">
      Join our support community to share your experiences and connect with
      others.
    </Typography>
  </Paper>
);

const BlogsAndVideosMessage = () => (
  <Paper
    sx={{
      padding: "20px",
      backgroundColor: "primary.main",
      minHeight: "140px",
    }}
  >
    <Typography variant="h6" gutterBottom>
      Blogs and Videos
    </Typography>
    <Typography variant="body1">
      Explore our collection of blogs and videos for more insights and
      resources.
    </Typography>
  </Paper>
);

const CrisisMessage = () => (
  <Box
    sx={{
      backgroundColor: "#e57373",
      minHeight: "80px",
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
    }}
  >
    <Typography variant="h6" gutterBottom color="white">
      If you or someone you know is in immediate danger because of thoughts of
      suicide, please call 119 or your local emergency number immediately.
    </Typography>
  </Box>
);

const InfoGrid = () => (
  <>
    <CrisisMessage />
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <CrisisInterventionMessage />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SupportCommunityMessage />
        </Grid>
        <Grid item xs={12} sm={4}>
          <BlogsAndVideosMessage />
        </Grid>
      </Grid>
    </Box>
  </>
);

export default InfoGrid;
