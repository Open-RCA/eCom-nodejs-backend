const mongoose = require("mongoose");
const Joi = require("joi");

const SubCategorySchema = mongoose.Schema({
  categoryId: {
    type: mongoose.Types.ObjectId,
    ref: "categories",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports.SubCategory = mongoose.model(
  "sub-categories",
  SubCategorySchema
);

module.exports.validateSubCategory = (SubCategory) => {
  const JoiSchema = Joi.object({
    categoryId: Joi.string().required(),
    name: Joi.string().min(4).max(40).required(),
  });

  return JoiSchema.validate(SubCategory);
};
