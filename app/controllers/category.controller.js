const Category = require("../models/Category.model");
const SubCategory = require("../models/SubCategory.model");
const validator = require("validator");

const CategoryController = {
  getall(req, res) {
    Category.find()
      .then((cats) => res.send({success: true, data: cats}))
      .catch((err) => res.send({success: false, message: err.message}));
  },
  getByid (req, res) {
    Category.findById(req.params.id)
      .then((cat) => {
        if(cat) return res.send({success: true, data: cat});
        return res.send({message:"No such category was found"})
      
      })
      .catch((err) => res.send({success: false,message: err.message}));
  },
  getSub (req, res){
    SubCategory.find({ categoryId: req.params.categoryId })
      .then((subcats) => {
        if(subcats) return res.send({success: true, data: subcats});
        return res.send({message: "No subcategory was found"})
      })
      .catch((err) => {return res.send({success: false,message: err.message})});
  },
  newCategory(req, res) {
    if (!validator.isLength(req.body.name, { min: 1, max: 30 })) {
      return res.send({ name: "Length must be between 5 and 30" });
    }
    Category.create({ name: req.body.name })
      .then((cart) => {res.send({success: true, data: cart})})
      .catch((err) => (err));
  },
  updateCat(req, res) {
    Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    )
      .then((cat) => res.send({success: true, data: cat}))
      .catch((err) => res.send({success: false, message: err.message}));
  },
  removeCat(req, res) {
    Category.findByIdAndDelete(req.params.id)
      .then(() => {
        SubCategory.deleteMany({ categoryId: req.params.id })
          .then(() => res.send({ success: true, message: "Category deleted" }))
          .catch((err) => res.send({success: false, message: err.message}));
      })
      .catch((err) => {return res.send({success: false, message: err.message})});
  },
};

module.exports = CategoryController;
