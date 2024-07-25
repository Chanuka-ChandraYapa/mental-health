const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3005;
const GOOGLE_MAPS_API_KEY = "AIzaSyANtAnAwYLJv7rIz-Fuef2cJulsgCdTek0";

app.use(cors());

app.get("/api/therapists", async (req, res) => {
  try {
    const { lat, lng } = req.query;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=3000&type=doctor&keyword=therapist&key=${GOOGLE_MAPS_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching data from Google Places API" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
