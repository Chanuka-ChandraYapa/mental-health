// src/components/MediumEmbed.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
import parse from "html-react-parser";

const MediumEmbed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:3004/medium-feed"); // Use the proxy endpoint
        setArticles(response.data.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Medium articles", error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={3}>
      {articles.map((article) => (
        <Grid item xs={12} md={6} lg={4} key={article.guid}>
          <Card
            style={{
              height: "500px",
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
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
                color="textSecondary"
                style={{ fontSize: "14px", marginTop: "10px" }}
              >
                {article.author}
              </Typography>
              <div style={{ marginTop: "10px" }}>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: "none",
                    color: "text.primary",
                    fontWeight: "bold",
                    display: "inline-block",
                    padding: "10px",
                  }}
                >
                  Read More...
                </a>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MediumEmbed;
