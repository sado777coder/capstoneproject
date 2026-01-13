const mongoose = require("mongoose");



const budgetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    month: {
      type: String, // e.g. "2026-01"
      required: true,
    },
    monthlyIncome: {
      type: Number,
      required: true,
    },
    fixedExpenses: [
      {
        name: String,
        amount: Number,
        category: String,
      },
    ],
    dailyAllowance: {
      type: Number,
    },
    remainingBalance: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Budget", budgetSchema);