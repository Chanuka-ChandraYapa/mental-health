import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";

const Chat = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = useRef(null);

  const handleSend = async () => {
    const response = await fetch("http://localhost:5000/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userInput }),
    });
    const data = await response.json();
    setChatHistory([
      ...chatHistory,
      { message: userInput, sender: "user" },
      { message: data.response, sender: "bot" },
    ]);
    setUserInput("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="background.default"
      color="text.primary"
      p={3}
    >
      <Typography variant="h4" gutterBottom>
        Mental Health Chatbot
      </Typography>
      <Card
        sx={{
          width: "100%",
          maxWidth: 600,
          height: 600,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ flex: 1, overflowY: "auto" }}>
          {chatHistory.map((chat, index) => (
            <Box
              key={index}
              sx={{
                textAlign: chat.sender === "user" ? "right" : "left",
                marginBottom: 2,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  display: "inline-block",
                  padding: 1,
                  borderRadius: 1,
                  bgcolor:
                    chat.sender === "user" ? "primary.main" : "success.main",
                  color: "white",
                  borderRadius: 2,
                }}
              >
                {chat.message}
              </Typography>
            </Box>
          ))}
          <div ref={chatEndRef} />
        </CardContent>
        <Box sx={{ display: "flex", padding: 2 }}>
          <TextField
            variant="outlined"
            label="Type a message"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            fullWidth
            sx={{ marginRight: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleSend}>
            Send
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default Chat;
