const Category = require("../models/Category.model");
const SubCategory = require("../models/SubCategory.model");
const { Product } = require("../models/productModel");
const { OrderDetails } = require("../models/OrderDetails");

const CategoryController = {
  getall(req, res) {
    Category.find()
      .then((cats) => res.send({ success: true, data: cats }))
      .catch((err) => res.send({ success: false, message: err.message }));
  },
  getByid(req, res) {
    Category.findById(req.params.id)
      .then((cat) => {
        if (cat) return res.send({ success: true, data: cat });
        return res.send({ message: "No such category was found" });
      })
      .catch((err) => res.send({ success: false, message: err.message }));
  },
  getSub(req, res) {
    SubCategory.find({ categoryId: req.params.categoryId })
      .then((subcats) => {
        if (subcats) return res.send({ success: true, data: subcats });
        return res.send({ message: "No subcategory was found" });
      })
      .catch((err) => {
        return res.send({ success: false, message: err.message });
      });
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
    const errors = {};

    //if name is empty
    errors.name = "Name is required.";
    if (!req.body.name) return res.status(400).send(errors);

    if (req.body.name.length < 1 || req.body.name.length > 30) {
      errors.name = "Length must be between 5 and 30";
      return res.status(400).send(errors);
    }

    Category.findOne({ name: req.body.name }).then((cat) => {
      if (cat) {
        //update category
        Category.findByIdAndUpdate(cat._id, { name: req.body.name })
          .then((newcat) => res.status(200).send({ success: true }))
          .catch((err) => console.log(err));
        return;
      }

      Category.create({ name: req.body.name })
        .then((category) => res.send({ category: category, success: true }))
        .catch((err) => console.log(err));
    });
  },
  updateCat(req, res) {
    Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    )
      .then((cat) => {
        if (cat) return res.status(200).send({ category: cat, success: true });
        res.status(400).send("Category doesn't exist.");
      })
      .catch((err) => console.log(err));
  },
  removeCat(req, res) {
    Category.findByIdAndDelete(req.params.id)
      .then((cat) => {
        if (!cat) return res.send("Category doesn't exist.");
        SubCategory.deleteMany({ categoryId: req.params.id })
          .then(() => res.send({ success: true, message: "Category deleted" }))
          .catch((err) => res.send({ success: false, message: err.message }));
      })
      .catch((err) => {
        return res.send({ success: false, message: err.message });
      });
  },
};

module.exports = CategoryController;
