const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const notificationsController = require("./controllers/notificationsController");
const Notification = require("./models/Notification");
const connectDB = require("./config/db");
const dotenv = require("dotenv");

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();
connectDB();

const PORT = process.env.PORT || 4001;

// In-memory storage for notifications
const notifications = [];

// Endpoint to handle incoming webhooks
app.post("/webhook-handler", async (req, res) => {
  console.log(req.body);
  const { message, userId } = req.body;
  if (message) {
    try {
      const newNotification = new Notification({
        userId,
        message,
      });
      const savedNotification = await newNotification.save();
      //   notifications.push(
      //     JSON.stringify(req.body, {
      //       _id: savedNotification._id,
      //     })
      //   );
      notifications.push(savedNotification);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
    console.log(notifications);
    res.status(200).send("Notification received");
  } else {
    res.status(400).send("Message is required");
  }
});

// Endpoint to get notifications (for SSE)
app.get("/notifications", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const intervalId = setInterval(() => {
    if (notifications.length > 0) {
      const message = notifications.shift();
      const messageString = JSON.stringify(message);
      console.log(messageString);
      res.write(`data: ${messageString}\n\n`);
    }
  }, 1000);

  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
});

app.use("/notifications/hist", notificationsController);

app.listen(PORT, () => {
  console.log(`Client server is running on port ${PORT}`);
});
