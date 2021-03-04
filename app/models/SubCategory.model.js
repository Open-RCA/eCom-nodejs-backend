const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId=require('joi-objectid')(Joi)

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
    categoryId: Joi.objectId().required(),
    name: Joi.string().min(1).max(30).required(),
  });

  return JoiSchema.validate(SubCategory);
};
