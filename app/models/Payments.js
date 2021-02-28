const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports.Payments = mongoose.model(
  "payments",
  mongoose.Schema({
    payment_type: {
      type: String,
      required: true,
    },
    payment_status: {
      type: String,
      required: true,
    },
    payment_date: {
      type: Date,
      default: Date.now,
    },
    allowed: {
      type: Boolean,
    },
  })
);

module.exports.validatePayment = (Payment) => {
  const JoiSchema = Joi.object({
    payment_status: Joi.string().required(),
    payment_type: Joi.string().required(),
    payment_date: Joi.date(),
    allowed: Joi.boolean(),
  });

  return JoiSchema.validate(Payment);
};
