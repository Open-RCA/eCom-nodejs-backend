const mongoose = require("mongoose");
const Joi = require("joi");
const { valid } = require("joi");

const OrderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  order_date: {
    type: Date,
    default: Date.now,
  },
});

const validateOrder = (Order) => {
  const JoiSchema = Joi.object({
    userId: Joi.objectId(),
    paymentId: Joi.objectId().required(),
    order_date: Joi.date(),
  });

  return JoiSchema.validate(Order);
};

module.exports.Order = mongoose.model("orders", OrderSchema);
module.exports.validateOrder = validateOrder;
