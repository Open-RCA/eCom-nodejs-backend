const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const { User } = db.user;
const Role = db.role;

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: err.message });
      I;
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.findOne(
      {
        _id: user.userRole,
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (roles._doc.name.toLowerCase() === "admin") {
          next();
          return;
        }

        res.status(403).send({ message: "Requires Admin Role!" });
        return;
      }
    );
  });
};

const isUser = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: user.role,
      },
      (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (role._doc.name.toLowerCase() === "user") {
          next();
          return;
        }

        res.status(403).send({ message: "Require user Role!" });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isUser,
};
module.exports = authJwt;
