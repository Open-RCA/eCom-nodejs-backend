const mongoose = require("mongoose");

const User = mongoose.model(
  "User",

  new mongoose.Schema({
    fullName: String,
    email: String,
    phoneNumber: String,
    password: String,
    userRole: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "roles",
    },
  })
);

module.exports = User;
