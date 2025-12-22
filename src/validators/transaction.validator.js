const Joi = require("joi");
const mongoose = require("mongoose");

const transactionValidator = Joi.object({
  userId: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message("Invalid userId");
      }
      return value;
    })
    .required(),

  amount: Joi.number()
    .positive()
    .required(),

  currency: Joi.string()
    .uppercase()
    .length(3)
    .required(),

  type: Joi.string()
    .valid("debit", "credit")
    .required(),

  channel: Joi.string()
    .required(),
});

module.exports = transactionValidator;