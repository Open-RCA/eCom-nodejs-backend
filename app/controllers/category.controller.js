const Category = require("../models/Category.model");
const SubCategory = require("../models/SubCategory.model");
const validator = require("validator");

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
