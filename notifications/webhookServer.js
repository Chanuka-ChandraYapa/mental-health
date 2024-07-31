const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

// In-memory storage for registered webhooks
const webhooks = [];

// Endpoint to register a webhook
app.post("/register-webhook", (req, res) => {
  const { url } = req.body;
  if (url) {
    webhooks.push(url);
    res.status(200).send("Webhook registered successfully");
  } else {
    res.status(400).send("URL is required");
  }
});

// Endpoint to trigger notifications
app.post("/send-notification", async (req, res) => {
  const { message, userId } = req.body;
  if (!message || !userId) {
    return res.status(400).send("Message and userId are required");
  }

  const payload = { message, userId };

  const promises = webhooks.map((webhook) =>
    axios
      .post(webhook, payload)
      .catch((err) =>
        console.error(`Error sending to ${webhook}:`, err.message)
      )
  );

  await Promise.all(promises);
  res.status(200).send("Notification sent");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
