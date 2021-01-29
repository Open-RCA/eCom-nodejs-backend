const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateEmail = (req, res, next) => {
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err){
            res.status(500).send({message: err.message});

            return
        }

        if (user){
            res.status(200).send({message: "Failed! Email is already in use!"})
        }

        next();
    })
}

checkRolesExisted = (req, res, next) => {
    if (req.body.role) {
        if (!ROLES.includes(req.body.roles)) {
          res.status(400).send({
            message: `Failed! Role ${req.body.roles[i]} does not exist!`
          });
          return;
        }
      
    }
  
    next();
  };

  const verifySignUp = {
    checkDuplicateEmail,
    checkRolesExisted
  };
  
  module.exports = verifySignUp;