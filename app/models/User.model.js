const mongoose = require("mongoose");

<<<<<<< HEAD
const User = mongoose.model(
  "User",

  new mongoose.Schema({
    fullName: String,
    email: String,
    phoneNumber: String,
    password: String,
    userRole: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Roles",
    },
  })
);
=======
const User = mongoose.model('user', 

    new mongoose.Schema({
        fullName: String,
        email: String,
        phoneNumber: String,
        password: String,
        userRole: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "roles"
        }    })
)

module.exports = User
>>>>>>> 64c6cc205e1d905f82ae1b8a39d6fd86f4058df7

module.exports = User;
