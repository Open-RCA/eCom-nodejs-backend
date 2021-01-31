const Wishlist = require('../models/Wishlist.model')

const WishlistController = {
    getWishlist(req,res){
        Wishlist.find()
        .then(wishlist=> res.send(wishlist))
        .catch(err=> console.log(err))
    },

    postWishlist(req,res){
            let newWishlist = new Wishlist({
                user_id: req.body.user_id,
                product_id: req.body.product_id,
                date: req.body.date
            })
        
            newWishlist.save()
            .then(wishlist => res.send(wishlist))
            .catch(err => console.log(err))
    },

    deleteWishlist(req,res)
    {
        Wishlist.findByIdAndDelete(req.params.id)
        .then(wishlist => res.send(wishlist))
        .catch(err => console.log(err))
    }
}
module.exports = WishlistController