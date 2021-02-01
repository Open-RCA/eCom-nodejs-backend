const mongoose = require("mongoose");

module.exports = mongoose.model(
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
