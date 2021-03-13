const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const OrderSchema = mongoose.Schema({
  customer: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  paymentId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "payments",
  },
  delivery_zone: {
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
    customer: Joi.objectId().required(),
    paymentId: Joi.objectId().required(),
    delivery_zone: Joi.string().required(),
    order_date: Joi.date(),
  });

  return JoiSchema.validate(Order);
};

module.exports.Order = mongoose.model("orders", OrderSchema);
module.exports.validateOrder = validateOrder;
