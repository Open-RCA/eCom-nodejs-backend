const multer = require('multer')

const {
    Product,
    validateProductSchema
} = require('../models/productModel')

const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        cb(null, "./app/uploads");
    },
    filename: function (req, file, cb) {
        cb(null,new Date()+ file.originalname);
    },
})


const upload = multer({
    storage: storage
})


createProduct = async (req, res) => {
    let body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide product details',
        })
    }
    body = {
        ...body,
        productImages: req.files
    }

    const {
        error
    } = validateProductSchema(body)
    if (error)
        return res.status(400).send(error)

    const newProduct = new Product(body)

    await newProduct.save()
    return res.status(201).json({
        success: true,
        product: newProduct,
        message: 'Product added successfully...'
    })


}

updateProduct = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide all details to update a product'
        })
    }

    Product.findOne({
        _id: req.params.id
    }, (err, product) => {
        if (err)
            return res.status(400).json({
                err,
                message: 'Product not found',
            })


        const proName = body.proName;
        const catId = body.catId;
        const quantityInStock = body.quantity;
        const price = body.price;
        const description = body.description;
        const review = body.review;
        const tag = body.tag;
        const registerDate = body.registerDate;

        const updates = {
            catId,
            proName,
            quantityInStock,
            price,
            description,
            review,
            tag,
            registerDate
        };


        if (req.file) {
            const productImages = req.file.filename
            updates.productImages = productImages
        }
        product.save()
            .then(() => {
                return res.status(200).json({
                    success: 'true',
                    id: product._id,
                    message: 'Product updated',
                })
            })
    }, )
}

removeProduct = async (req, res) => {
    await Product.findByIdAndDelete({
        _id: req.params.id
    }, (err, product) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })

        }

        return res.status(200).json({
            success: true,
            data: product
        })
    }).catch(err => res.send({success: false, message: err.message}))
}


getProducts = (req, res) => {
    Product.find()
        .then((foundProducts) => {
            if (foundProducts.length <= 0) {
                return res.status(400).send(foundProducts)
            } else {
                return res.status(200).send({
                    success: true,
                    data: foundProducts
                })
            }
        }).catch(() => {
            return res.status(400).send({
                success: false,
                message: "something went wrong!"
            })
        })
}

getByCategory = (req, res) => {
    Product.find({
            'catId': req.params.catId
        })
        .then((docs) => {
            if (docs.length <= 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Products not found',
                })
            } else {
                return res.status(200).json({
                    success: true,
                    products: docs
                })
            }
        }).catch(() => {
            return res.status(400).send({
                success: false,
                message: 'Something went wrong!'
            })
        })
}

searchProduct = (req, res) => {
    Product.find({
            'proName': req.params.proName
        })
        .then((docs) => {
            if (docs.length <= 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Product not found',
                })
            } else {
                return res.status(200).send({
                    success: true,
                    data: docs
                })
            }
        }).catch(() => {
            return res.status(400).json({
                success: false,
                message: 'Something went wrong!'
            })
        })
}

getLatest = (req, res) => {

    Product.find({
            $query: {},
            $orderby: {
                registerDate: -1
            }
        }).limit(10)
        .then((docs) => {
            if (docs.length <= 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Data not found',
                })
            } else {
                return res.status(200).send({
                    success: true,
                    latest: docs
                })
            }
        }).catch(() => {
            return res.status(400).json({
                success: false,
                message: 'Something went wrong'
            })
        })
}

getPopularProducts = async (req, res) => {
    const prodAgg = await Product.aggregate([{
        $match: {
            quantity: {
                $gte: 7
            }
        }
    }]).exec()
    res.json({
        prodAgg
    })

    console.log(prodAgg)
}



module.exports = {
    createProduct,
    updateProduct,
    removeProduct,
    getProducts,
    getByCategory,
    searchProduct,
    getLatest,
    getPopularProducts,
    upload
}