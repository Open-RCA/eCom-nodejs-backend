const Joi = require('joi')
Joi.objectId=require('joi-objectid')(Joi)

const mongoose = require('mongoose')

const Wishlist= mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
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

function validateWish(Wishlist){
    const JoiSchema=Joi.object({
        user_id:Joi.objectId().required(),
        product_id:Joi.objectId().required(),
        date:Joi.date().required(),
    }).options({abortEarly:false});
    return JoiSchema.validate(Wishlist)
}

module.exports.Wishlist=mongoose.model("Wishlist",Wishlist)
module.exports.validateWish=validateWish