const Cart = require('../models/Cart.model')

const CartController = {
    getCart(req,res){
        Cart.find()
        .then(cart=> res.send(cart))
        .catch(err=> console.log(err))
    },

    postCart(req,res){
            let newCart = new Cart({
                user_id: req.body.user_id,
                product_id: req.body.product_id,
                date: req.body.date
            })
        
            newCart.save()
            .then(cart => res.send(cart))
            .catch(err => console.log(err))
    },

    deleteCart(req,res)
    {
        Cart.findByIdAndDelete(req.params.id)
        .then(cart => res.send(cart))
        .catch(err => console.log(err))
    }
}
module.exports = CartController