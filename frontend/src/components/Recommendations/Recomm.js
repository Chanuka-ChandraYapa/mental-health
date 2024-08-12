import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Box,
  Button,
} from "@mui/material";
import { ReactTyped } from "react-typed";
import ReactMarkdown from "react-markdown";
import Footer from "../Footer";
import config from "../../config";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const Recommendations = ({ userId }) => {
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_URL = `${config.moodtracker}`;
  const [showButton, setShowButton] = useState(false);

  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");
  const sessionId = localStorage.getItem("sessionId") || uuidv4();
  if (!localStorage.getItem("sessionId")) {
    localStorage.setItem("sessionId", sessionId);
  }
  const configs = {
    headers: {
      // Authorization: `Bearer ${token}`,
      "x-auth-token": token,
    },
  };

  const [displayText, setDisplayText] = useState("");
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    console.log(localStorage.getItem("recommondations"));
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`${API_URL}/recommendations`, configs);
        setRecommendations(response.data.recommendations);
        setDisplayText(response.data.recommendations);
        console.log(response.data.recommendations);
        localStorage.setItem("recommondations", response.data.recommendations);
      } catch (err) {
        setError("Failed to fetch recommendations. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (!localStorage.getItem("recommondations")) {
      fetchRecommendations();
    } else {
      console.log(sessionId);
      setLoading(false);
      setRecommendations(localStorage.getItem("recommondations"));
      setDisplayText(localStorage.getItem("recommondations"));
      console.log("Hi", localStorage.getItem("recommondations"));
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("recommondations")) {
      setAvailable(true);
    } else {
      setAvailable(false);
    }
  }, []);

  if (loading) {
    return (
      <Container
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  const TypingAnimation = ({ text }) => {
    return (
      <ReactTyped
        strings={[text]}
        // strings={[displayText]}
        typeSpeed={20}
        backSpeed={20}
        showCursor={true}
        cursorChar="|"
        loop={false}
      />
    );
  };

  return (
    <Container maxWidth="lg" mt={5}>
      <Typography variant="h3" gutterBottom color="primary.main" mt={5}>
        Recommendations for today
      </Typography>
      <Typography variant="h5" paragraph color="text.primary">
        {!available ? (
          <ReactTyped
            // strings={[text]}
            strings={[displayText]}
            typeSpeed={20}
            backSpeed={20}
            showCursor={true}
            cursorChar="|"
            loop={false}
            onComplete={() => setShowButton(true)}
          />
        ) : (
          <ReactMarkdown>{recommendations}</ReactMarkdown>
        )}
        {showButton && (
          <Box
            mt={5}
            alignItems="center"
            justifyContent="center"
            display="flex"
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/chat")}
            >
              Follow up on our chat service
            </Button>
          </Box>
        )}
      </Typography>
    </Container>
  );
};

const Recommendation = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "background.default",
          padding: 3,
        }}
      >
        <Recommendations />
      </Box>
      <Footer />
    </>
  );
};

export default Recommendation;
