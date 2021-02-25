const express=require('express')
const  productController=require('../controllers/productController')
const { verifyToken } = require('../middlewares/authJwt')
const router=express.Router()

router.get('/getAll',productController.getProducts)
router.post('/addNewProduct',[verifyToken, authJwt.isAdmin, productController.upload.array('productImages'),productController.createProduct])
router.get('/getCategoryById/:catId', productController.getByCategory)
router.get('/getByproductName/:proName',productController.searchProduct)
router.get('/getLatestProduct',productController.getLatest)
router.get('/getPopularProducts',productController.getPopularProducts)
router.put('/updateProduct/:id',[verifyToken,authJwt.isAdmin, productController.updateProduct])
router.delete('/removeproduct/:id',[verifyToken,authJwt.isAdmin, productController.removeProduct])

module.exports=router