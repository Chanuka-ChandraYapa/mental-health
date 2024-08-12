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
  Box,
} from "@mui/material";
import { GradientButton } from "./GradientButton";
import Footer from "./Footer";
import RandomQuote from "./Quotes";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { token } = useSelector((state) => state.user);
  const { t } = useTranslation();
  return (
    <>
      <Box bgcolor="background.default" pb={10} minHeight="100vh">
        <section
          className="hero bg-cover bg-center flex items-center justify-center relative"
          style={{
            position: "relative",
            height: "100vh", // Ensure the section takes up almost the whole screen height
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            color: "white",
            padding: "20px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: "url('/home.jpeg')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              opacity: 0.2, // Adjust the opacity as needed
              zIndex: 0,
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0) 80%)",
              zIndex: 1,
            }}
          ></div>
          <div style={{ position: "relative", zIndex: 2 }}>
            <RandomQuote />
            <Typography
              variant="h5"
              paragraph
              color="primary.main"
              align="center"
              fontSize={30}
            >
              {t("description")}
            </Typography>

            {!token && (
              <div alignItems="center">
                <GradientButton
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/register"
                  sx={{ marginTop: 3 }}
                >
                  Get Started
                </GradientButton>
              </div>
            )}
          </div>
        </section>
        <Container
          maxWidth="lg"
          sx={{ marginTop: 4 }}
          bgcolor="background.default"
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Link to="/mood" style={{ textDecoration: "none" }}>
                <Card
                  sx={{
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <div style={{ height: "300px", overflow: "hidden" }}>
                    <LazyLoadImage
                      src="/mood.jpeg"
                      alt="Mood"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {t("moodCard")}
                    </Typography>
                    <Typography variant="body2">
                      {t("moodCardDescription")}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Link to="/recommendations" style={{ textDecoration: "none" }}>
                <Card
                  sx={{
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <div style={{ height: "300px", overflow: "hidden" }}>
                    <LazyLoadImage
                      src="/recomm.jpg"
                      alt="Mood"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {t("recommendationsCard")}
                    </Typography>
                    <Typography variant="body2">
                      {t("recommendationsCardDescription")}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Link to="/resources/videos" style={{ textDecoration: "none" }}>
                <Card
                  sx={{
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <div style={{ height: "300px", overflow: "hidden" }}>
                    <LazyLoadImage
                      src="/resource.jpg"
                      alt="Mood"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {t("resourcesCard")}
                    </Typography>
                    <Typography variant="body2">
                      {t("resourcesCardDescription")}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Link to="/support" style={{ textDecoration: "none" }}>
                <Card
                  sx={{
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <div style={{ height: "300px", overflow: "hidden" }}>
                    <LazyLoadImage
                      src="/sup.jpeg"
                      alt="Mood"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {t("supportCard")}
                    </Typography>
                    <Typography variant="body2">
                      {t("supportCardDescription")}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Link to="/therapists" style={{ textDecoration: "none" }}>
                <Card
                  sx={{
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <div style={{ height: "300px", overflow: "hidden" }}>
                    <LazyLoadImage
                      src="/therapist.jpeg"
                      alt="Mood"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {t("therapistsCard")}
                    </Typography>
                    <Typography variant="body2">
                      {t("therapistsCardDescription")}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Link to="/chat" style={{ textDecoration: "none" }}>
                <Card
                  sx={{
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <div style={{ height: "300px", overflow: "hidden" }}>
                    <LazyLoadImage
                      src="/chat.jpeg"
                      alt="Mood"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {t("chatCard")}
                    </Typography>
                    <Typography variant="body2">
                      {t("chatCardDescription")}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Home;
