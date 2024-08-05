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

const Chat = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState(
    localStorage.getItem("chatHistory")
      ? JSON.parse(localStorage.getItem("chatHistory"))
      : []
  );
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const [signInMessage, setSignInMessage] = useState(false);
  const token = localStorage.getItem("token");

  const handleSend = async () => {
    if (!token) {
      setSignInMessage(true);
    }
    if (userInput !== "" && token) {
      setLoading(true);
      setSignInMessage(false);
      const response = await fetch(
        // "https://mental-health-chatbot-dlhq.onrender.com/chatbot",
        // "http://localhost:5000/chatbot",
        `${config.chatbot}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: userInput, sessionId }),
          // mode: "no-cors",
        }
      );
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
    <Card
      sx={{
        width: "100%",
        maxWidth: isMobile ? "100vh" : 600,
        minWidth: 400,
        height: "100vh",
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
          {signInMessage && (
            <Alert
              severity="error"
              sx={{ marginBottom: "20px", marginTop: "20px" }}
            >
              Please SignIn to use the chat service.
            </Alert>
          )}
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
        <div ref={chatEndRef} />
      </CardContent>
      <Box position="relative" bottom={0} sx={{ display: "flex", padding: 2 }}>
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
  );
};

export default Chat;
