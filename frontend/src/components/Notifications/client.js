import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";

const Notification = () => {
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:4001/notifications");

    eventSource.onmessage = (event) => {
      setNotification(event.data);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const registerWebhook = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/register-webhook",
        {
          url: "http://localhost:4001/webhook-handler",
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error registering webhook:", error);
    }
  };

  return (
    <Box bgcolor="background.default" pb={10} minHeight="100vh" mt={10}>
      <div>
        <button onClick={registerWebhook}>Register Webhook</button>
        {notification && <div>New Notification: {notification}</div>}
      </div>
    </Box>
  );
};

export default Notification;
