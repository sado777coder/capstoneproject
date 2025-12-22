require("dotenv").config();
const transactionModel = require("../models/transaction.model");
const { createTransactionAlert } = require("../services/alert.service");

// CREATE transaction
const createTransaction = async (req, res, next) => {
  try {
    const transaction = await transactionModel.create({
      ...req.body,
      userId: req.user._id,
    });

    //  CREATE ALERT
    await createTransactionAlert({
      userId: req.user._id,
      transactionId: transaction._id,
      action: "created",
    });

    res.status(200).json({
      message: "Transaction created successfully",
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

// GET all transactions
const getAllTransaction = async (req, res, next) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const transactions = await transactionModel
      .find({})
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      message: "Transactions fetched",
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
};

// GET single transaction
const getTransactionById = async (req, res, next) => {
  try {
    const transaction = await transactionModel.findById(req.params.id);

    if (!transaction) {
      return res
        .status(404)
        .json({ message: "Transaction not found" });
    }

    res.status(200).json({
      message: "Transaction fetched",
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE transaction
const updateTransactionById = async (req, res, next) => {
  try {
    const updatedTransaction = await transactionModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTransaction) {
      return res
        .status(404)
        .json({ message: "Transaction not found" });
    }

    //  CREATE ALERT
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

// DELETE transaction
const deletetTransactionById = async (req, res, next) => {
  try {
    const transaction = await transactionModel.findByIdAndDelete(req.params.id);

    if (!transaction) {
      return res
        .status(404)
        .json({ message: "Transaction not found" });
    }

    // CREATE ALERT
    await createTransactionAlert({
      userId: transaction.userId,
      transactionId: transaction._id,
      action: "deleted",
    });

    res.status(200).json({
      message: "Transaction deleted",
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