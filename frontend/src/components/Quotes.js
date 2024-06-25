import { Fade, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

const RandomQuote = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [visible, setVisible] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);

  const fetchQuote = async () => {
    setVisible(false); // Start fading out the old quote
    setTimeout(async () => {
      try {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        setQuote(data.content);
        setAuthor(data.author);
        setVisible(true); // Fade in the new quote
      } catch (error) {
        console.error("Error fetching the quote:", error);
      }
    }, 500); // Delay to allow fade-out transition
  };

  useEffect(() => {
    const welcomeTimeout = setTimeout(() => {
      setShowWelcome(false);
      fetchQuote();
      const interval = setInterval(fetchQuote, 60000); // 600000ms = 10 minutes
      return () => clearInterval(interval); // Clean up the interval on component unmount
    }, 10000); // 20000ms = 20 seconds delay for the welcome message

    return () => clearTimeout(welcomeTimeout); // Clean up the timeout on component unmount
  }, []);

  return (
    <div>
      {(showWelcome || !quote) && (
        <Typography
          variant="h3"
          gutterBottom
          color="text.primary"
          align="center"
          sx={{ color: "white" }} // Ensures text color is white for contrast
        >
          Welcome to Mental Bloom
        </Typography>
      )}
      <Fade in={visible} timeout={2000}>
        <div>
          {!showWelcome && quote && (
            <>
              <Typography variant="h4">{quote}</Typography>
              <p>
                <em>- {author}</em>
              </p>
            </>
          )}
        </div>
      </Fade>
    </div>
  );
};

export default RandomQuote;
