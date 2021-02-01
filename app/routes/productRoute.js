const express=require('express')
const  productController=require('../controllers/productController')
const router=express.Router()
router.get('/getProductById/:id',productController.getProductById)
router.get('/getAll',productController.getProducts)
router.post('/addNewProduct',[productController.upload.array('productImages'),productController.createProduct])
router.get('/getCategoryById/:catId',productController.getByCategory)
router.get('/getByproductName/:proName',productController.searchProduct)
router.get('/getLatestProduct',productController.getLatest)
router.get('/getPopularProducts',productController.getPopularProducts)
router.put('/updateProduct/:id',productController.updateProduct)
router.delete('/removeproduct/:id',productController.removeProduct)

module.exports=router