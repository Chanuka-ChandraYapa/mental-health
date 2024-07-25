const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const answerRoutes = require("./routes/answerRoutes");
var cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api", answerRoutes);
app.use("/api/journal", require("./routes/journalRoutes"));

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
