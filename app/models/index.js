const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./User.model");
db.role = require("./Role.model");
db.products=require("./productModel")
db.rate=require("./rateModel")


module.exports = db;
