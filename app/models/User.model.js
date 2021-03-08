const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

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

const validateUser = (user) => {
  const joiSchema = Joi.object({
    fullName: Joi.string().min(3).max(50).required(),
    email: Joi.string().required(),
    phoneNumber: Joi.string().required().min(10).max(10),
    password: Joi.string().min(6).max(40).required(),
    userRole: Joi.objectId().required(),
  });

  return joiSchema.validate(user);
};

module.exports.User = User;
module.exports.validateUser = validateUser;
