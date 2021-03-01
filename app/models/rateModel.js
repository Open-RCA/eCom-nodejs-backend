const mongoose=require('mongoose')
const Joi=require('joi')
Joi.objectId=require('joi-objectid')(Joi)
const Schema=mongoose.Schema

const Rate=new Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    proId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    stars:{
        type:Number,
        required:true
    },
    review:{
        type:String,
        required:true
    }
})

function validatedRate(Rate) {
    const JoiSchema=Joi.object({
        userId:Joi.objectId(),
        proId:Joi.objectId(),
        stars:Joi.number().min(1).max(5),
        review:Joi.string()
    }).options({abortEarly:false});
return JoiSchema.validate(Rate)
}

module.exports.Rate=mongoose.model('rate',Rate)
module.exports.validatedRate=validatedRate