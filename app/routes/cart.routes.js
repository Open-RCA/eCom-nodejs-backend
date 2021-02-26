const express = require('express')
const router = express.Router();
const CartController = require('../controllers/cart.controller')

//read from cart
router.get('/',CartController.getCart)

//add to Cart
router.post('/add',CartController.postCart)

//delete from Cart
router.delete('/delete/:id',CartController.deleteCart)

module.exports = router
