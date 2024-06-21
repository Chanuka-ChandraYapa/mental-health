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

const Recommendations = ({ userId }) => {
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState("");
  const [error, setError] = useState(null);
  const API_URL = "https://mental-health-mood-tracker.onrender.com/api";
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [displayText, setDisplayText] = useState("");
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    console.log(localStorage.getItem("recommondations"));
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`${API_URL}/recommendations`, config);
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
      <Typography variant="h3" gutterBottom color="primary.main">
        Recommendations for today
      </Typography>
      <Typography variant="h5" paragraph color="text.primary">
        {!available ? (
          //   <ReactMarkdown>
          //   <ReactMarkdown
          //     components={{
          //       p: ({ node, ...props }) => (
          //         <TypingAnimation text={props.children} />
          //       ),
          //       blockquote: ({ node, ...props }) => (
          //         <blockquote>
          //           <TypingAnimation text={props.children} />
          //         </blockquote>
          //       ),
          //       ul: ({ node, ...props }) => (
          //         <ul>
          //           {props.children.map((child, i) => (
          //             <li key={i}>
          //               <TypingAnimation text={child.props.children} />
          //             </li>
          //           ))}
          //         </ul>
          //       ),
          //     }}
          //   >
          //     {recommendations}
          //   </ReactMarkdown>
          <ReactTyped
            // strings={[text]}
            strings={[displayText]}
            typeSpeed={20}
            backSpeed={20}
            showCursor={true}
            cursorChar="|"
            loop={false}
          />
        ) : (
          //   </ReactMarkdown>
          <ReactMarkdown>{recommendations}</ReactMarkdown>
        )}
      </Typography>
    </Container>
  );
};

const Recommendation = () => {
  return (
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
  );
};

export default Recommendation;
