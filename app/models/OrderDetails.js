const mongoose = require("mongoose");
const Joi = require("joi");

module.exports.OrderDetails = mongoose.model(
  "order_details",
  mongoose.Schema({
    orderId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    productId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  })
);

module.exports.validateOrderDetails = (OrderDetails) => {
  const JoiSchema = Joi.object({
    orderId: Joi.string().required(),
    productId: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    total: Joi.number().required(),
  });

  return JoiSchema.validate(OrderDetails);
};
