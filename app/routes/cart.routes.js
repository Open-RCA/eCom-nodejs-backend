const mongoose = require('mongoose')
const Cart = require('../models/Cart.model')
const express = require('express')
const router = express.Router()
const validator = require('validator')

router.get('/', (req, res)=>{
  res.find
})

//add person
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


module.exports = router