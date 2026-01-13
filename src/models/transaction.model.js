const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["debit", "credit"],
      required: true,
    },
    category: {
      type: String, // Food, Transport, etc.
    },
    note: {
      type: String,
    },
    channel: {
      type: String, // cash, mobile money, card, etc.
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
