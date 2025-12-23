require("dotenv").config();
const cors = require("cors");
const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const logRequest = require("./middlewares/logger");
const userRoute = require("./routes/user.route");
const alertRoute = require("./routes/alert.route");
const analyticsRoute = require("./routes/analytics.route.js");
const transactionRoute = require("./routes/transaction.route.js");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");



const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:3002",
  credentials: true,
}));


app.use(logRequest);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/users", userRoute);
app.use("/api", alertRoute)
app.use("/api", analyticsRoute);
app.use("/api", transactionRoute);









app.use(errorHandler);

// export app
module.exports = app;