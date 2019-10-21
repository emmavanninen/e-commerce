const express = require('express')
const router = express.Router()
const Category = require('../products/models/Catergory');
const categoryController = require('./utils/categoryController');
const createProductController = require('./controller/createProductController');




router.get('/add-category', (req, res) => {
    
    res.render('products/addcategory')
})

router.post('/add-category', categoryController.categoryValidation)

router.get('/get-all-categories', categoryController.getAllCategories)

router.get('/create-fake-product/:categoryName/:categoryID', createProductController.createProductById)



module.exports = router