const Category = require("../models/Category.model");
const SubCategory = require("../models/SubCategory.model");
const { Product } = require("../models/productModel");
const OrderDetails = require("../models/OrderDetails");
const validator = require("validator");
const mongoose = require("mongoose");

const CategoryController = {
  getall(req, res) {
    Category.find()
      .then((cats) => res.send(cats))
      .catch((err) => console.log(err));
  },
  getByid(req, res) {
    Category.findById(req.params.id)
      .then((cat) => res.send(cat))
      .catch((err) => console.log(err));
  },
  getSub(req, res) {
    SubCategory.find({ categoryId: req.params.categoryId })
      .then((subcats) => res.send(subcats))
      .catch((err) => console.log(err));
  },
  async getTop(req, res) {
    //get 10 most ordered products
    OrderDetails.aggregate([
      {
        $group: {
          _id: "$productId",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 50 },
    ])
      .then(async (prods) => {
        let i;
        let temp = [];
        let data = [];
        console.log(prods);
        //get all category ids from subcategories of products
        for (i = 0; i < prods.length; i++) {
          await Product.findById(prods[i]._id, "catId")
            .then(async (prod) => {
              await SubCategory.findById(prod.catId)
                .then((subcat) => temp.push(subcat.categoryId))
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        }

        //get category details
        for (i = 0; i < temp.length; i++) {
          await Category.findById(temp[i])
            .then((cat) => {
              if (!data.find((x) => String(x._id) === String(cat._id))) {
                data.push(cat);
              }
            })
            .catch((err) => console.log(err));
        }

        //send top categories
        res.send(data);
      })
      .catch((err) => console.log(err));
  },
  newCategory(req, res) {
    if (!validator.isLength(req.body.name, { min: 5, max: 30 })) {
      return res.send({ name: "Length must be between 5 and 30" });
    }
    Category.create({ name: req.body.name })
      .then((cart) => res.send(cart))
      .catch((err) => console.log(err));
  },
  updateCat(req, res) {
    Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    )
      .then((cat) => res.send(cat))
      .catch((err) => console.log(err));
  },
  removeCat(req, res) {
    Category.findByIdAndDelete(req.params.id)
      .then((cat) => {
        SubCategory.deleteMany({ categoryId: req.params.id })
          .then((subs) => res.send({ success: true }))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  },
};

module.exports = CategoryController;
