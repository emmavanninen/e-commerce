const express = require('express')
const router = express.Router()
const Product = require('../products/models/Product');
const productController = require('../admin/controller/productController')

// router.get('/', (req, res) => {
//    res.send('hey!')
// })

router.get('/', productController.getAllProducts)

router.get('/:id', productController.getOneProduct)

router.get('/getproductbycategory/:id', productController.getByCategory)

router.get('/deleteproduct', productController.deleteProduct)

module.exports = router