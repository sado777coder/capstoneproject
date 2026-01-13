const Joi = require("joi");

const transactionValidator = Joi.object({
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

  category: Joi.string().optional(),

  note: Joi.string().optional(),

  channel: Joi.string().required(),
});

module.exports = transactionValidator;