const Budget = require("../models/budget.model");

/**
 * CREATE / INIT BUDGET (PER MONTH)
 */
const createBudget = async (req, res, next) => {
  try {
    const { month, monthlyIncome, fixedExpenses = [] } = req.body;

    // prevent duplicate budget for same month
    const existing = await Budget.findOne({
      userId: req.user._id,
      month,
    });

    if (existing) {
      return res.status(400).json({
        message: "Budget already exists for this month",
      });
    }

    const budget = await Budget.create({
      userId: req.user._id,
      month,
      monthlyIncome,
      fixedExpenses,
      remainingBalance: monthlyIncome,
    });

    res.status(201).json({
      message: "Budget created successfully",
      data: budget,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBudget,
};