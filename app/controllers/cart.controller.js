const {Cart,validateCart} = require('../models/Cart.model')

const CartController = {
    getCart(req,res){
        Cart.find()
        .then(cart=> res.send({success: true, data: cart}))
        .catch(err=> res.send({success: false, message: err.message}))
    },

    postCart(req,res){
        
            let newCart = new Cart({
                user_id: req.body.user_id,
                product_id: req.body.product_id,
                date: req.body.date
            })
            if(!newCart){
                return res.status(400).json({
                    success:false,
                    error:'You must provide valid info'
                })
            }

            const {error}=validateCart(newCart)
            if(error)
                return res.status(400).send(error)
        
            newCart.save()
            .then(cart => res.send({success: true, data: cart}))
            .catch(err => res.send({success: false, message: err.message}))
    },

    deleteCart(req,res)
    {
        Cart.findByIdAndDelete(req.params.id)
        .then(cart => res.send({success: true, data:cart}))
        .catch(err => res.send({success: false, message: err.message}))
    }
}
module.exports = CartController