// swaggerOptions.js

const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mental Bloom API Documentation",
      version: "1.0.0",
      description: "Combined API documentation for multiple services",
    },
    servers: [
      {
        url: "http://localhost:5001/api/users",
        description: "User Management API",
      },
      {
        url: "https://mental-health-user-management-production.up.railway.app/api/users",
        description: "User Management Production API",
      },
      { url: "http://localhost:5000", description: "Chatbot API" },
      {
        url: "https://mental-health-chatbot-production.up.railway.app",
        description: "Chatbot Production API",
      },
      // Add more servers as needed
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "apiKey",
          in: "header",
          name: "x-auth-token",
          description: "Token required for authentication",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: [
    path.join(__dirname, "swaggerDefinitions", "*.yaml"), // Path to all Swagger documentation files
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
