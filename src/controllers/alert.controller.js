const alertModel = require("../models/alert.model");

// GET all alerts (filter + pagination)
const getAllAlerts = async (req, res, next) => {
  try {
    const {
      userId,
      severity,
      resolved,
      page = 1,
      limit = 5,
    } = req.query;

    const filter = {};
    if (userId) filter.userId = userId;
    if (severity) filter.severity = severity;
    if (resolved !== undefined)
      filter.resolved = resolved === "true";

    const skip = (page - 1) * limit;

    const alerts = await alertModel
      .find(filter)
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .skip(Number(skip))
      .limit(Number(limit));

    const count = await alertModel.countDocuments(filter);

    res.status(200).json({
      message: "Alerts fetched successfully",
      page: Number(page),
      limit: Number(limit),
      count,
      data: alerts,
    });
  } catch (error) {
    next(error);
  }
};

// GET single alert
const getAlertById = async (req, res, next) => {
  try {
    const alert = await alertModel.findById(req.params.id);

    if (!alert) {
      return res.status(404).json({
        message: `Alert with ID ${req.params.id} not found`,
      });
    }

    res.status(200).json({
      message: "Alert fetched",
      data: alert,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE alert (resolve / acknowledge)
const updateAlertById = async (req, res, next) => {
  try {
    const updatedAlert = await alertModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedAlert) {
      return res.status(404).json({ message: "Alert not found" });
    }

    res.status(200).json({
      message: "Alert updated",
      data: updatedAlert,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE alert (admin only – optional)
const deleteAlertById = async (req, res, next) => {
  try {
    const deletedAlert = await alertModel.findByIdAndDelete(req.params.id);

    if (!deletedAlert) {
      return res.status(404).json({
        message: "Alert not found",
      });
    }

    res.status(200).json({
      message: "Alert deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAlerts,
  getAlertById,
  updateAlertById,
  deleteAlertById,
};