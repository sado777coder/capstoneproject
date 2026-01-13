const express = require("express");
const auth = require("../middlewares/auth");

const {
  transactionSummary,
  userAnalytics,
  transactionTrends,
} = require("../controllers/analytics.controller");

const router = express.Router();
router.use(auth);

/**
 * ANALYTICS ROUTES
 */
router.get("/analytics/summary", transactionSummary);
router.get("/analytics/user", userAnalytics);
router.get("/analytics/trends", transactionTrends);

module.exports = router