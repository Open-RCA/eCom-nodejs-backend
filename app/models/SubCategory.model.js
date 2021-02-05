const mongoose = require("mongoose");

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

module.exports = mongoose.model("sub-categories", SubCategorySchema);

/*
name,
*/
