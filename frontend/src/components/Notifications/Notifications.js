import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Alert,
  Button,
  IconButton,
} from "@mui/material";
import { useSelector } from "react-redux";
import config from "../../config";
import CloseIcon from "@mui/icons-material/Close";

const Notifications = ({ setUnreadCount, notifications, setNotifications }) => {
  //   const [notifications, setNotifications] = useState([]);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.get(
          `http://localhost:4001/notifications/hist`,
          config
        );

        console.log(JSON.parse(JSON.stringify(response.data)));
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications", error);
      }
    };

    fetchNotifications();
  }, []);

  //   useEffect(() => {
  //     // Create a new EventSource instance to listen for notifications
  //     const eventSource = new EventSource("http://localhost:4001/notifications");

  //     eventSource.onmessage = (event) => {
  //       // Parse the incoming data
  //       //   const notification = event.data;
  //       console.log(event);
  //       const notification = JSON.parse(event.data);
  //       console.log(notification);

  //       const currentUser = JSON.parse(localStorage.getItem("user"));
  //       const userId = currentUser.id;

  //       // Add the new notification to the state
  //       if (userId === notification.userId) {
  //         setNotifications((prevNotifications) => [
  //           ...prevNotifications,
  //           notification,
  //         ]);
  //         setUnreadCount((prev) => prev + 1);
  //       }
  //     };

  //     // Clean up the event source when the component unmounts
  //     return () => {
  //       eventSource.close();
  //     };
  //   }, []); // Empty dependency array to run only once on component mount

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

  const handleDeleteNotification = async (index) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((_, i) => i !== index)
    );
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.delete(
        `http://localhost:4001/notifications/hist/${notifications[index]._id}`,
        config
      );
    } catch (error) {
      console.error("Error deleting entry", error);
    }
  };

  return (
    <Box bgcolor="background.default" color="text.primary" pt={5}>
      <Container maxWidth="md" sx={{ padding: "20px", minHeight: "100vh" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Notifications
        </Typography>
        <Button onClick={registerWebhook} variant="contained" color="primary">
          Register Webhook
        </Button>
        <Box sx={{ marginTop: "20px" }}>
          {notifications.length === 0 ? (
            <Typography variant="body1">No notifications available.</Typography>
          ) : (
            notifications.map((notification, index) => (
              <Alert
                key={index} // Use index as a key for dynamic lists
                severity={notification.severity} // Use severity field
                //   severity="info"
                sx={{ marginBottom: "10px" }}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => handleDeleteNotification(index)}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                {notification.message}
              </Alert>
            ))
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Notifications;
