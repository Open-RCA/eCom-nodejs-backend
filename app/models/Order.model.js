const mongoose = require("mongoose");

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

module.exports = mongoose.model("orders", OrderSchema);
