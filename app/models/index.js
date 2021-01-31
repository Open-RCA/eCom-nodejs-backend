const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.category = require("./Category.model");
db.subcategory = require("./SubCategory.model");
db.order = require("./Order.model");
db.orderDetails = require("./OrderDetails");
db.payments = require("./OrderDetails");

db.ROLES = ["user", "admin"];

module.exports = db;
