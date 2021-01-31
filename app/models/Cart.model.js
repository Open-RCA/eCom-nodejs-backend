const mongoose = require('mongoose')

const CartSchema= mongoose.Schema({
    user_id: {
        type: String,
        required: false
    },
    product_id: {
        type: String,
        required: false
    },
    date:{
        type: Date
    }
})
module.exports=mongoose.model("cart",CartSchema)