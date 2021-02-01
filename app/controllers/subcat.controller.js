const SubCategory = require("../models/SubCategory.model");
const validator = require("validator");

const SubController = {
  getall(req, res) {
    SubCategory.find()
      .then((subcats) => res.send(subcats))
      .catch((err) => console.log(err));
  },
  getBYid(req, res) {
    SubCategory.findById(req.params.id)
      .then((subcat) => res.send(subcat))
      .catch((err) => console.log(err));
  },
  addNew(req, res) {
    if (!validator.isLength(req.body.name, { min: 5, max: 30 })) {
      return res.send({ name: "Length must be between 5 and 30" });
    }
    SubCategory.create({
      name: req.body.name,
      categoryId: req.body.categoryId,
    })
      .then((subcart) => res.send(subcart))
      .catch((err) => console.log(err));
  },
  updateSub(req, res) {
    SubCategory.findByIdAndUpdate(req.params.id)
      .then((sub_cart) => res.send(sub_cart))
      .catch((err) => console.log(err));
  },
  deleteSub(req, res) {
    SubCategory.findByIdAndDelete(req.params.id)
      .then((sub_cart) => res.send({ success: true }))
      .catch((err) => console.log(err));
  },
};
module.exports = SubController;
