const mongoose = require('mongoose')
const Cart = require('../models/Cart.model')
const express = require('express')
const router = express.Router()
const validator = require('validator')

//read from cart
router.get('/', (req, res)=>{
  Cart.find()
  .then(cart=> res.send(cart))
  .catch(err=> console.log(err))
})

//add to Cart
router.post('/add',(req,res)=>{
    let newCart = new Cart({
        user_id: req.body.user_id,
        product_id: req.body.product_id,
        date: Date.now
    })

    newCart.save()
    .then(cart => res.send(cart))
    .catch(err => console.log(err))
})

//delete from Cart
router.delete('/delete/:id', (req,res)=>{
    Cart.findByIdAndDelete(req.params.id)
    .then(cart => res.send(cart))
    .catch(err => console.log(err))
})
module.exports = router