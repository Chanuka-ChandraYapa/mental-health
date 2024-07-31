import React, { useState, useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Drawer,
  Fab,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import Chat from "./Chat";

const ChatDrawer = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="chat"
        onClick={toggleDrawer(true)}
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        <ChatIcon />
      </Fab>
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Chat />
      </Drawer>
    </>
  );
};

export default ChatDrawer;
