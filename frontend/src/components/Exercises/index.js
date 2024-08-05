import React from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  Container,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import BreathingExerciseDialog from "./Breating";

const Exercise = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom align="center" mt={4}>
        Let's Track Your Fitness
      </Typography>
      <Grid container spacing={3} mt={2}>
        {/* Column 1: Breathing Exercise */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent
              sx={{
                padding: 5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="h5" gutterBottom align="center">
                  Breathing Exercise
                </Typography>
                <Typography variant="body1" gutterBottom align="center">
                  Learn and practice breathing exercises to improve your mental
                  well-being.
                </Typography>
                <BreathingExerciseDialog />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Column 2: Sleep Tracker */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent
              sx={{
                padding: 5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="h5" gutterBottom align="center">
                  Sleep Tracker
                </Typography>
                <Typography variant="body1" gutterBottom align="center">
                  Track your sleep patterns to ensure you are getting enough
                  rest.
                </Typography>
              </Box>
              <CardActions>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={() => navigate("/sleep-tracker")}
                >
                  Go to Sleep Tracker
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>

        {/* Column 3: Step Tracker */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent
              sx={{
                padding: 5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="h5" gutterBottom align="center">
                  Step Tracker
                </Typography>
                <Typography variant="body1" gutterBottom align="center">
                  Monitor your daily steps and stay active for a healthier life.
                </Typography>
              </Box>
              <CardActions>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={() => navigate("/step-tracker")}
                >
                  Go to Step Tracker
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Exercise;
