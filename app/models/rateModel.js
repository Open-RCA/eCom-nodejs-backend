const mongoose=require('mongoose')
const Joi=require('joi')
const Schema=mongoose.Schema

const Rate=new Schema({
    userId:{
        type:String,
        required:true
    },
    proId:{
        type:String,
        required:true,
        ref: "products"
    },
    stars:{
        type:Number,
        required:true
    },
    review:{
        type:String,
    }
})

function validatedRate(Rate) {
    const JoiSchema=Joi.object({
        userId:Joi.string().required(),
        proId:Joi.string().required(),
        stars:Joi.number().min(1).max(5),
        review:Joi.string()
    }).options({abortEarly:false});
return JoiSchema.validate(Rate)
}

module.exports.Rate=mongoose.model('rate',Rate)
module.exports.validatedRate=validatedRate