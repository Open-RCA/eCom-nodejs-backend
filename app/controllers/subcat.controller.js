const {
  SubCategory,
  validateSubCategory,
} = require("../models/SubCategory.model");
const Category = require("../models/Category.model");

const SubController = {
  getall(req, res) {
    SubCategory.find()
      .then((subcats) => res.send({ success: true, data: subcats }))
      .catch((err) => res.send({ success: false, message: err.message }));
  },
  getBYid(req, res) {
    SubCategory.findById(req.params.id)
      .then((subcat) => res.send({ success: true, data: subcat }))
      .catch((err) => res.send({ success: false, message: err }));
  },
  addNew(req, res) {
    const { error } = validateSubCategory(req.body);
    if (error) res.status(400).send(error.message);

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
    if (req.body.name.length < 1 || req.body.name.length > 30) {
      errors.name = "Length must be between 5 and 30";
      return res.status(400).send(errors);
    }
    SubCategory.findByIdAndUpdate(req.params.id, { name: req.body.name })
      .then((sub_cat) => {
        if (sub_cat) return res.send({ success: true, data: sub_cart });
        res.send("Subcategory doesn't exist.");
      })
      .catch((err) => console.log(err));
  },
  deleteSub(req, res) {
    SubCategory.findByIdAndDelete(req.params.id)
      .then((sub_cat) => {
        if (sub_cat)
          return res.send({ success: true, message: "Sub category deleted" });
        res.send("Subcategory doesn't exist.");
      })
      .catch((err) => console.log(err));
  },
};
module.exports = SubController;
