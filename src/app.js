require("dotenv").config();
const express = require("express");
const cors = require("cors");

const errorHandler = require("./middlewares/errorHandler");
const logRequest = require("./middlewares/logger");

const userRoute = require("./routes/user.route");
const alertRoute = require("./routes/alert.route");
const analyticsRoute = require("./routes/analytics.route");
const transactionRoute = require("./routes/transaction.route");
const budgetRoute = require("./routes/budget.route");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

  // MIDDLEWARES

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173", // Vite frontend
  "http://localhost:3002", // optional (swagger/local backend)
  "https://capstoneproject-6-w38z.onrender.com" // Render
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(logRequest);

   //SWAGGER

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api/docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

  // ROUTES

app.use("/api/users", userRoute);
app.use("/api", budgetRoute);
app.use("/api", transactionRoute);
app.use("/api", alertRoute);
app.use("/api", analyticsRoute);


   //ERROR HANDLER

app.use(errorHandler);

module.exports = app;