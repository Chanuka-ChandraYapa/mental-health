import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Link as MuiLink,
  useMediaQuery,
  Alert,
} from "@mui/material";
// import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useTheme } from "@emotion/react";
import { v4 as uuidv4 } from "uuid";
import config from "../../config";

const ChatPage = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState(
    localStorage.getItem("chatHistory")
      ? JSON.parse(localStorage.getItem("chatHistory"))
      : []
  );
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const chatEndRef = useRef(null);
  const token = localStorage.getItem("token");

  const handleSend = async () => {
    if (userInput !== "") {
      setLoading(true);
      setErrorMessage(null);
      const response = await fetch(
        // "https://mental-health-chatbot-dlhq.onrender.com/chatbot",
        // "http://localhost:5000/chatbot",
        `${config.chatbot}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify({ message: userInput }),
          // mode: "no-cors",
        }
      );
      if (!response.ok) {
        // Handle HTTP errors
        const errorData = await response.json();
        console.error("Error:", errorData.error || "Something went wrong");
        // Display error message to the user
        setErrorMessage(errorData.error || "Something went wrong");
        setLoading(false);
        return;
      }
      const data = await response.json();
      setChatHistory([
        ...chatHistory,
        { message: userInput, sender: "user" },
        { message: data.response, sender: "bot" },
      ]);
      setUserInput("");
      setLoading(false);
      localStorage.setItem(
        "chatHistory",
        JSON.stringify([
          ...chatHistory,
          { message: userInput, sender: "user" },
          { message: data.response, sender: "bot" },
        ])
      );
      console.log(chatHistory);
      console.log(localStorage.getItem("chatHistory"));
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && userInput !== "") {
      handleSend();
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const LinkRenderer = (props) => {
    return (
      <MuiLink
        href={props.href}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ color: "primary.main" }}
      >
        {props.children}
      </MuiLink>
    );
  };

  const handleReset = () => {
    setChatHistory([]);
    localStorage.removeItem("chatHistory");
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const sessionId = localStorage.getItem("sessionId") || uuidv4();
  if (!localStorage.getItem("sessionId")) {
    localStorage.setItem("sessionId", sessionId);
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
      p={isMobile ? 0 : 0}
    >
      {!isMobile && (
        <Box sx={{ display: "flex", padding: isMobile ? 0 : 0 }}>
          <Typography variant="h4" gutterBottom mt={2}>
            Mental Health Chatbot
          </Typography>
          <Typography
            color="secondary"
            onClick={handleReset}
            sx={{ marginLeft: 2, cursor: "pointer" }}
            align="center"
            mt={4}
          >
            ↺
          </Typography>
        </Box>
      )}
      <Card
        sx={{
          width: "100%",
          maxWidth: isMobile ? "100vh" : 600,
          height: isMobile ? "100vh" : 600,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ flex: 1, overflowY: "auto" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img
              src="/robotf.png"
              style={{ width: "200px", height: "200px" }}
              alt="Robot"
            />
            <Alert
              severity="warning"
              sx={{ marginBottom: "20px", marginTop: "20px" }}
            >
              I may make mistakes. Please use me with care.😊
            </Alert>
          </Box>
          {chatHistory.map((chat, index) => (
            <Box
              key={index}
              sx={{
                textAlign: chat.sender === "user" ? "right" : "left",
                marginBottom: 2,
              }}
            >
              <Box
                sx={{
                  display: "inline-block",
                  padding: 1,
                  borderRadius: 2,
                  bgcolor: chat.sender === "user" ? "primary.main" : "#141414",
                  color: "white",
                  fontFamily: "Segoe UI , sans-serif",
                }}
              >
                {chat.sender === "user" ? (
                  <Typography variant="body1" align="left">
                    {chat.message}
                  </Typography>
                ) : (
                  // renderMessage(chat.message)
                  <ReactMarkdown
                    components={{
                      a: LinkRenderer,
                    }}
                  >
                    {chat.message}
                  </ReactMarkdown>
                )}
              </Box>
            </Box>
          ))}
          {errorMessage && (
            <Alert
              severity="error"
              sx={{ marginBottom: "20px", marginTop: "20px" }}
            >
              {errorMessage}
            </Alert>
          )}
          <div ref={chatEndRef} />
        </CardContent>
        <Box
          position="relative"
          bottom={0}
          sx={{ display: "flex", padding: 2 }}
        >
          <TextField
            variant="outlined"
            label="Type a message"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            fullWidth
            sx={{ marginRight: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSend}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={24} /> : null}
          >
            {loading ? "" : "Send"}
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default ChatPage;
