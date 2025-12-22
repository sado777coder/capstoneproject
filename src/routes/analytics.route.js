const express = require("express");
const auth = require("../middlewares/auth");

const {
  transactionSummary,
  userAnalytics,
  transactionTrends,
} = require("../controllers/analytics.controller");

const router = express.Router();
router.use(auth);

// routers
router.get("/transactions/summary", transactionSummary);
router.get("/users/:userId", userAnalytics);
router.get("/transactions/trends", transactionTrends);

module.exports = router;






