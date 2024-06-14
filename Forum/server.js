const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const postRoutes = require("./routes/postRoutes");
var cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use("/posts", postRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
