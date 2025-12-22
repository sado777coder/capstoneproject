const Joi = require("joi");

/**
 * UPDATE ALERT VALIDATION
 * Used for resolving / acknowledging alerts
 */
const updateAlertValidator = Joi.object({
  message: Joi.string().optional(),

  severity: Joi.string()
    .valid("low", "medium", "high")
    .optional(),

  resolved: Joi.boolean().optional(),
}).min(1); // must update at least one field

module.exports = {
  updateAlertValidator,
};