const mongoose = require('mongoose')

const CartSchema= mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        required: false
    },
    product_id: {
        type: mongoose.Types.ObjectId,
        required: false
    },
    date:{
        type: Date
    }
})
module.exports=mongoose.model("cart",CartSchema)