const db = require("../models");
const { User } = db.user;
const Role = db.role;
const mongoose = require("mongoose");

const checkDuplicateEmail = (req, res, next) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }

    if (user) {
      return res
        .status(200)
        .send({ message: "Failed! Email is already in use!" });
    }

    next();
  });
};

checkRolesExisted = async (req, res, next) => {
  const isvalid = await mongoose.Types.ObjectId.isValid(req.body.userRole);
  if (!isvalid) {
    return res.send({ message: "ID must be a valid mongoose object id" });
  }

  if (req.body.userRole) {
    await Role.findById(req.body.userRole)
      .then((role) => {
        if (!role) {
          return res
            .status(404)
            .send({
              message: `Failed! Role ${req.body.userRole} does not exist!`,
            });
        } else {
          next();
        }
      })
      .catch((err) => {
        return res.status(400).send({
          message: err.message,
        });
      });
  }
};

const verifySignUp = {
  checkDuplicateEmail,
  checkRolesExisted,
};

module.exports = verifySignUp;
