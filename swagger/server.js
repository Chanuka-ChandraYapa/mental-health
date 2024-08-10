const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerOptions");
const path = require("path");
var cors = require("cors");

app.use(cors());

// Serve Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(
  "/swagger-ui",
  express.static(path.join(__dirname, "/swagger-ui.html"))
);
// Serve Swagger definitions
app.use(
  "/swaggerDefinitions",
  express.static(path.join(__dirname, "/swaggerDefinitions"))
);

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
