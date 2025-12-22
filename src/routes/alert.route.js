const express = require("express");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");

const {
  updateAlertValidator,
} = require("../validators/alert.validator");

const {
  getAllAlerts,
  getAlertById,
  updateAlertById,
  deleteAlertById,
} = require("../controllers/alert.controller");

const router = express.Router();

// protect all alert routes
router.use(auth);

// READ alerts
router.get("/alerts", getAllAlerts);
router.get("/alerts/:id", getAlertById);

// UPDATE alert (resolve / acknowledge)
router.put(
  "/alerts/:id",
  validate(updateAlertValidator),
  updateAlertById
);

// DELETE alert (optional – admin/system)
router.delete("/alerts/:id", deleteAlertById);

module.exports = router;