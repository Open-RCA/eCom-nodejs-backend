const mongoose = require("mongoose");

module.exports = mongoose.model(
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
