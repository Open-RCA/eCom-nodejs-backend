const {
  SubCategory,
  validateSubCategory,
} = require("../models/SubCategory.model");
const Category = require("../models/Category.model");
const validator = require("validator");

const SubController = {
  getall(req, res) {
    SubCategory.find()
      .then((subcats) => res.send({success: true, data: subcats}))
      .catch((err) => res.send({success: false, message: err.message}));
  },
  getBYid(req, res) {
    SubCategory.findById(req.params.id)
      .then((subcat) => res.send({success: true, data: subcat}))
      .catch((err) => res.send({success: false, message: err}));
  },
  addNew(req, res) {
    if (!validator.isLength(req.body.name, { min: 1, max: 30 })) {
      return res.send({ name: "Length must be between 5 and 30" });
    }
    SubCategory.create({
      name: req.body.name,
      categoryId: req.body.categoryId,
    })
      .then((subcat) => res.send({success: true,data: subcat}))
      .catch((err) => res.send({ success: false, message: err.message}));
  },
  updateSub(req, res) {
    SubCategory.findByIdAndUpdate(req.params.id)
      .then((sub_cat) => res.send(sub_cat))
      .catch((err) => ({success: false, message: err.message}));
  },
  deleteSub(req, res) {
    SubCategory.findByIdAndDelete(req.params.id)
      .then((sub_cart) => res.send({ success: true , message: "sub category deleted"}))
      .catch((err) => res.send({ success: false, message: err.message}));
  },
};
module.exports = SubController;
