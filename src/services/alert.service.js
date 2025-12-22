const alertModel = require("../models/alert.model");

const createTransactionAlert = async ({
  userId,
  transactionId,
  action, // created | updated | deleted
}) => {
  let rule = "Transaction activity";
  let severity = "low";
  let message = "";

  switch (action) {
    case "created":
      message = "A new transaction was created";
      break;
    case "updated":
      message = "A transaction was updated";
      severity = "medium";
      break;
    case "deleted":
      message = "A transaction was deleted";
      severity = "high";
      break;
  }

  return alertModel.create({
    userId,
    transactionId,
    rule,
    message,
    severity,
  });
};

module.exports = {
  createTransactionAlert,
};