const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const validator = require('validator')
const WishlistController = require('../controllers/wishlist.controller')

//read from Wishlist
router.get('/',WishlistController.getWishlist)

//add to Wishlist
router.post('/add',WishlistController.postWishlist)

//delete from Wishlist
router.delete('/delete/:id',WishlistController.deleteWishlist)

module.exports = router
