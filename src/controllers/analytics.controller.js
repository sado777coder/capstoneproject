require("dotenv").config();
const mongoose = require("mongoose");
const transactionModel = require("../models/transaction.model");

/**
 * GET TRANSACTION SUMMARY
 * total transactions
 * total amount
 * average amount
 */
const transactionSummary = async (req, res, next) => {
  try {
    const result = await transactionModel.aggregate([
      {
        $group: {
          _id: null,
          totalTransactions: { $sum: 1 },
          totalAmount: { $sum: "$amount" },
          averageAmount: { $avg: "$amount" },
        },
      },
    ]);

    res.status(200).json({
      message: "Transaction summary fetched successfully",
      data: result[0] || {
        totalTransactions: 0,
        totalAmount: 0,
        averageAmount: 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET USER ANALYTICS
 * total spent
 * transaction count
 * highest transaction
 */
const userAnalytics = async (req, res, next) => {
  try {
    const { userId } = req.user._id;

    // optional safety check
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const result = await transactionModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: "$userId",
          totalSpent: { $sum: "$amount" },
          transactionCount: { $sum: 1 },
          highestTransaction: { $max: "$amount" },
        },
      },
    ]);

    res.status(200).json({
      message: "User analytics fetched successfully",
      data: result[0] || {
        totalSpent: 0,
        transactionCount: 0,
        highestTransaction: 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET TRANSACTION TRENDS
 * daily | monthly
 */
const transactionTrends = async (req, res, next) => {
  try {
    const {
      period = "daily",
      userId,
      startDate,
      endDate,
    } = req.query;

     // BUILD MATCH FILTER
    const match = {};

    if (userId) {
      match.userId = new mongoose.Types.ObjectId(userId);
    }

    if (startDate || endDate) {
      match.createdAt = {};
      if (startDate) match.createdAt.$gte = new Date(startDate);
      if (endDate) match.createdAt.$lte = new Date(endDate);
    }

    //GROUPING LOGIC
    let groupBy;

    if (period === "monthly") {
      groupBy = {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" },
      };
    } else {
      groupBy = {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" },
        day: { $dayOfMonth: "$createdAt" },
      };
    }

  // AGGREGATION PIPELINE
    const result = await transactionModel.aggregate([
      { $match: match },
      {
        $group: {
          _id: groupBy,
          totalAmount: { $sum: "$amount" },
          transactionCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          period: {
            $cond: [
              { $eq: [period, "monthly"] },
              {
                $concat: [
                  { $toString: "$_id.year" },
                  "-",
                  { $toString: "$_id.month" },
                ],
              },
              {
                $concat: [
                  { $toString: "$_id.year" },
                  "-",
                  { $toString: "$_id.month" },
                  "-",
                  { $toString: "$_id.day" },
                ],
              },
            ],
          },
          totalAmount: 1,
          transactionCount: 1,
        },
      },
      { $sort: { period: 1 } },
    ]);

    res.status(200).json({
      message: "Transaction trends fetched successfully",
      filters: { period, userId, startDate, endDate },
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  transactionSummary,
  userAnalytics,
  transactionTrends,
};