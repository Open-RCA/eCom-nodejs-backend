const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId=require('joi-objectid')(Joi)

module.exports.OrderDetails = mongoose.model(
  "order_details",
  mongoose.Schema({
    orderId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "orders"
    },
    productId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "products"
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
    orderId: Joi.objectId().required(),
    productId: Joi.objectId().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    total: Joi.number().required(),
  });

  return JoiSchema.validate(OrderDetails);
};
