const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Transaction, Budget & Alert API",
      version: "1.0.0",
      description:
        "API documentation for authentication, transactions, budgets, alerts, and analytics",
    },
    servers: [
      {
        url: "http://localhost:3002/api",
        description: "Local server",
      },
      {
        url: "https://capstoneproject-6-w38z.onrender.com/api",
        description: "Live server",
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

      schemas: {
        User: {
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string" },
            role: { type: "string", example: "customer" },
            userType: {
              type: "string",
              enum: ["student", "professional"],
            },
            isActive: { type: "boolean" },
          },
        },

        Transaction: {
          type: "object",
          required: ["amount", "currency", "type"],
          properties: {
            amount: { type: "number", example: 300 },
            currency: { type: "string", example: "GHS" },
            type: { type: "string", enum: ["debit", "credit"] },
            category: { type: "string", example: "Food" },
            note: { type: "string" },
            channel: { type: "string", example: "cash" },
          },
        },

        Budget: {
          type: "object",
          required: ["month", "monthlyIncome"],
          properties: {
            month: { type: "string", example: "2026-01" },
            monthlyIncome: { type: "number", example: 5000 },
            dailyAllowance: { type: "number" },
            remainingBalance: { type: "number" },
            fixedExpenses: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  amount: { type: "number" },
                  category: { type: "string" },
                },
              },
            },
          },
        },

        Alert: {
          type: "object",
          properties: {
            rule: { type: "string" },
            message: { type: "string" },
            severity: {
              type: "string",
              enum: ["low", "medium", "high"],
            },
            resolved: { type: "boolean" },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.js", "./src/docs/*.swagger.js"],
};

module.exports = swaggerJsdoc(options);