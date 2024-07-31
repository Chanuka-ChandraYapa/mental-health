import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Stack,
  Button,
  Link,
} from "@mui/material";
import Journal from "../Mood/Journal";
import MoodRatingGraph from "../Mood/Graph";
import { PersonalInfo } from "./info";

const Dashboard = () => {
  return (
    <Box bgcolor="background.default" color="text.primary" pt={5}>
      <Container maxWidth="lg" sx={{ marginTop: "20px" }}>
        <Grid container spacing={3}>
          {/* Profile Information Section */}
          <Grid item xs={12} md={6}>
            <PersonalInfo />
          </Grid>

          {/* Placeholder Section 1 */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: 500, overflow: "auto" }}>
              <CardContent
                className="scroll-container"
                sx={{ overflowY: "scroll", paddingRight: "10px" }}
              >
                {/* Content for Section 1 */}
                <Journal />
              </CardContent>
            </Card>
          </Grid>

          {/* Placeholder Section 2 */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Mood Ratings</Typography>
                {/* Content for Section 2 */}
                <MoodRatingGraph />
              </CardContent>
            </Card>
          </Grid>

          {/* Placeholder Section 3 */}
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              {/* Personality Type Identifier */}
              <Card sx={{ padding: "10px", height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" color="primary.main">
                    Personality Type
                  </Typography>
                  <Typography variant="body1">
                    Discover more about yourself by exploring your personality
                    type. Understanding your personality traits can offer
                    valuable insights into your behavior and preferences,
                    helping you in both personal and professional aspects of
                    your life.{" "}
                    <Link
                      href="https://www.16personalities.com/"
                      target="_blank"
                      rel="noopener"
                      sx={{ textDecoration: "none", color: "primary.main" }}
                    >
                      Take the Personality Test
                    </Link>
                  </Typography>
                </CardContent>
              </Card>

              {/* Quote of the Day */}
              <Card sx={{ padding: "10px", height: "100%" }}>
                <CardContent>
                  <Typography variant="h6">Quote of the Day</Typography>
                  <Typography variant="body1">
                    "The only way out is through." - Robert Frost
                  </Typography>
                </CardContent>
              </Card>

              {/* Resource of the Day */}
              <Card sx={{ padding: "10px", height: "100%" }}>
                <CardContent>
                  <Typography variant="h6">Resource of the Day</Typography>
                  <Link
                    href="https://example.com/resource"
                    target="_blank"
                    rel="noopener"
                    sx={{ textDecoration: "none", color: "primary.main" }}
                  >
                    Check out today's recommended resource
                  </Link>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
