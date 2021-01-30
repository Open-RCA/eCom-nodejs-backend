const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const Role = db.role;

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
    if (req.body.userRole) {
     
      Role.findById({_id: req.body.userRole}).then((role) => {
      console.log("my role",role._id)
      return
    })
    .catch((err) => {
      res.status(400).send({
        message: `Failed! Role ${req.body.userRole} does not exist!`
      });
    })
      
    }
  
    next();
  };

  const verifySignUp = {
    checkDuplicateEmail,
    checkRolesExisted
  };
  
  module.exports = verifySignUp;