const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Transaction & Alert API",
      version: "1.0.0",
      description: "API documentation for transactions, alerts, analytics, and auth",
    },
    servers: [
      {
        url: "http://localhost:3002/api",
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [
    "./src/routes/*.js",
    "./src/docs/*.swagger.js", //  swagger-only files
  ],
};

module.exports = swaggerJsdoc(options);