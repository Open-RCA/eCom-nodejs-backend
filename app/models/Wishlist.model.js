const mongoose = require('mongoose')

const WishlistSchema= mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true
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
module.exports=mongoose.model("wishlist",WishlistSchema)