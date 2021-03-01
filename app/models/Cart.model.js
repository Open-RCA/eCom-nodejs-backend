const Joi = require('joi')
const mongoose = require('mongoose')
Joi.objectId=require('joi-objectid')(Joi)

const Cart= mongoose.Schema({
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


function validateCart(Cart){
    const JoiSchema=Joi.object({
        user_id:Joi.ObjectId().required(),
        product_id:Joi.ObjectId().required(),
        date:Joi.date().required(),
    }).options({abortEarly:false});
    return JoiSchema.validate(Cart)
}
module.exports.Cart=mongoose.model("Cart",Cart)
module.exports.validateCart=validateCart
