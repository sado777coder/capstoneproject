const mongoose = require("mongoose");
const transactionModel = require("../models/transaction.model");
const Budget = require("../models/budget.model");
const { createTransactionAlert } = require("../services/alert.service");
const User = require("../models/user.model")

/**
 * Helper: Get current month in YYYY-MM format
 */
const getCurrentMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
};

/**
 * CREATE TRANSACTION
 */
const createTransaction = async (req, res, next) => {
  try {
    // 1️⃣ Create the transaction
    const transaction = await transactionModel.create({
      ...req.body,
      userId: req.user._id,
    });

    let updatedBudget = null;

    // 2️⃣ Update budget ONLY if it's a debit transaction
    if (transaction.type === "debit") {
      const currentMonth = getCurrentMonth();

      // `new: true` ensures we get the updated budget document
      updatedBudget = await Budget.findOneAndUpdate(
        { userId: req.user._id, month: currentMonth },
        { $inc: { remainingBalance: -transaction.amount } },
        { new: true }
      );
    }

    // 3️ Create transaction alert
    await createTransactionAlert({
      userId: req.user._id,
      transactionId: transaction._id,
      action: "created",
    });

    // 4️ Return transaction + updated budget
    res.status(201).json({
      message: "Transaction created successfully",
      data: transaction,
      budget: updatedBudget, // <-- now you can see remainingBalance
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET ALL USER TRANSACTIONS (PAGINATED)
 */
const getAllTransaction = async (req, res, next) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const transactions = await transactionModel
      .find({ userId: req.user._id })
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      message: "Transactions fetched successfully",
      page: Number(page),
      limit: Number(limit),
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET SINGLE TRANSACTION (OWNED)
 */
const getTransactionById = async (req, res, next) => {
  try {
    const transaction = await transactionModel.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({
      message: "Transaction fetched successfully",
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * UPDATE TRANSACTION
 * Handles budget reversal + re-application safely
 */
const updateTransactionById = async (req, res, next) => {
  try {
    const existingTransaction = await transactionModel.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!existingTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    const updatedTransaction = await transactionModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    const currentMonth = getCurrentMonth();

    // Reverse old debit
    if (existingTransaction.type === "debit") {
      await Budget.findOneAndUpdate(
        { userId: existingTransaction.userId, month: currentMonth },
        { $inc: { remainingBalance: existingTransaction.amount } }
      );
    }

    // Apply new debit
    if (updatedTransaction.type === "debit") {
      await Budget.findOneAndUpdate(
        { userId: updatedTransaction.userId, month: currentMonth },
        { $inc: { remainingBalance: -updatedTransaction.amount } }
      );
    }

    // Create alert
    await createTransactionAlert({
      userId: updatedTransaction.userId,
      transactionId: updatedTransaction._id,
      action: "updated",
    });

    res.status(200).json({
      message: "Transaction updated successfully",
      data: updatedTransaction,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE TRANSACTION
 * Restores budget if debit
 */
const deletetTransactionById = async (req, res, next) => {
  try {
    const transaction = await transactionModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (transaction.type === "debit") {
      const currentMonth = getCurrentMonth();

      await Budget.findOneAndUpdate(
        { userId: transaction.userId, month: currentMonth },
        { $inc: { remainingBalance: transaction.amount } }
      );
    }

    // Create alert
    await createTransactionAlert({
      userId: transaction.userId,
      transactionId: transaction._id,
      action: "deleted",
    });

    res.status(200).json({
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTransaction,
  getAllTransaction,
  getTransactionById,
  updateTransactionById,
  deletetTransactionById,
};