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
<<<<<<< HEAD
    const { error } = validateSubCategory(req.body);
    if (error) res.status(400).send(error);

    Category.findById(req.body.categoryId)
      .then((category) => {
        if (category) {
          SubCategory.findOne({
            name: req.body.name,
            categoryId: req.body.categoryId,
          })
            .then((subcat) => {
              if (subcat) {
                //update
                SubCategory.findByIdAndUpdate(subcat._id, {
                  name: req.body.name,
                  categoryId: req.body.categoryId,
                })
                  .then((upcat) =>
                    res.send({ msg: "Subcategory updated", success: true })
                  )
                  .catch((err) => console.log(err));
              }
              SubCategory.create({
                name: req.body.name,
                categoryId: req.body.categoryId,
              })
                .then((subcart) => res.send(subcart))
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        } else {
          res.send({ msg: "Category doesn't exist" });
        }
      })
      .catch((err) => console.log(err));
  },
  updateSub(req, res) {
    if (!validator.isLength(req.body.name, { min: 5, max: 30 })) {
      return res.send({ name: "Length must be between 5 and 30" });
    }
    SubCategory.findByIdAndUpdate(req.params.id, { name: req.body.name })
      .then((sub_cat) => {
        if (sub_cat) return res.send(sub_cart);
        res.send("Subcategory doesn't exist.");
      })
      .catch((err) => console.log(err));
  },
  deleteSub(req, res) {
    SubCategory.findByIdAndDelete(req.params.id)
      .then((sub_cat) => {
        if (sub_cat) return res.send({ success: true });
        res.send("Subcategory doesn't exist.");
      })
      .catch((err) => console.log(err));
=======
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
>>>>>>> 64c6cc205e1d905f82ae1b8a39d6fd86f4058df7
  },
};
module.exports = SubController;
