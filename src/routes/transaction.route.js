const express = require("express");
const validate = require("../middlewares/validate");
const auth = require("../middlewares/auth");
const transactionValidator = require("../validators/transaction.validator");

const {
  createTransaction,
  getAllTransaction,
  getTransactionById,
  updateTransactionById,
  deletetTransactionById,
} = require("../controllers/transaction.controller");

const router = express.Router();
router.use(auth);

// CREATE transaction
router.post(
  "/transactions",
  validate(transactionValidator),
  createTransaction
);

// GET all transactions
router.get("/transactions", getAllTransaction);

// GET single transaction
router.get("/transactions/:id", getTransactionById);

// UPDATE transaction
router.put(
  "/transactions/:id",
  validate(transactionValidator),
  updateTransactionById
);

// DELETE transaction
router.delete("/transactions/:id", deletetTransactionById);

module.exports = router;