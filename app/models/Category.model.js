const mongoose = require("mongoose");

module.exports = mongoose.model(
  "categories",
  mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
  })
);
