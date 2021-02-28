const Joi = require('joi');
const mongoose = require('mongoose')

const CartSchema= mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId
    },
    product_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    date:{
        type: Date,
        required: true
    }
})
module.exports=mongoose.model("cart",CartSchema)

module.exports.validateCart = (CartSchema) => {
    const JoiSchema = Joi.object({
      user_id: Joi.objectId().required(),
      product_id: Joi.objectId().required(),
      date: Joi.date().required()
    });
  
    return JoiSchema.validate(CartSchema);
  };