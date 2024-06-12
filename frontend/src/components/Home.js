import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";

const Home = () => {
  const { token } = useSelector((state) => state.user);
  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to our Mental Health Platform
      </Typography>
      <Typography variant="body1" paragraph>
        Our platform is designed to provide comprehensive support and guidance
        for your mental well-being. Here are the key features and services we
        offer:
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Mood Tracking and Analysis
              </Typography>
              <Typography variant="body2">
                Track your mood over time and gain insights into patterns and
                triggers.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Personalized Recommendations
              </Typography>
              <Typography variant="body2">
                Receive personalized recommendations based on your mood and
                preferences.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Resources and Support
              </Typography>
              <Typography variant="body2">
                Access a wealth of resources and support materials to aid in
                your mental health journey.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Support Forums
              </Typography>
              <Typography variant="body2">
                Participate in supportive communities and connect with others
                facing similar challenges.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Therapists and Crisis Interventions
              </Typography>
              <Typography variant="body2">
                Access professional therapists and crisis interventions when
                needed.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {!token && (
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
          sx={{ marginTop: 3 }}
        >
          Get Started
        </Button>
      )}
    </Container>
  );
};

export default Home;
