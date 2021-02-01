const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.cart = require("./Cart.model");
db.wishlist = require("./Wishlist.model");
db.category = require("./Category.model");
db.subcategory = require("./SubCategory.model");
db.order = require("./Order.model");
db.orderDetails = require("./OrderDetails");
db.payments = require("./OrderDetails");
db.user = require("./User.model");
db.role = require("./Role.model");
db.products=require("./productModel")
db.rate=require("./rateModel")


module.exports = db;
