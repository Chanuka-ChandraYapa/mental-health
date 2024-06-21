// src/components/MediumEmbed.js
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
import parse from "html-react-parser";
import { Link } from "react-router-dom";

const MediumEmbed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:3004/medium-feed"); // Use the proxy endpoint
        setArticles(response.data.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Medium articles", error);
        setLoading(false);
        setError(true);
      }
    };

    fetchArticles();
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
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="background.default"
      color="text.primary"
      p={5}
    >
      <Grid container spacing={3}>
        {articles.map((article) => (
          <Grid item xs={12} sm={6} md={6} lg={4} key={article.guid}>
            <Card
              style={{
                height: "300px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {article.image && (
                <div style={{ height: "300px", overflow: "hidden" }}>
                  <img
                    src={article.image}
                    alt={article.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
              <CardContent style={{ flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  style={{ fontSize: "18px", fontWeight: "bold" }}
                >
                  {article.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="secondary"
                  style={{ fontSize: "14px", marginTop: "10px" }}
                >
                  {article.author}
                </Typography>
                <div style={{ marginTop: "10px" }}>
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Typography
                      component="href"
                      color="primary"
                      style={{
                        textDecoration: "none",
                        color: "primary.main",
                        fontWeight: "bold",
                        display: "inline-block",
                      }}
                    >
                      Read More...
                    </Typography>
                  </a>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MediumEmbed;
