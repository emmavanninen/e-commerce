const express = require('express')
const router = express.Router()
const Category = require('../products/models/Catergory');
const categoryValidation = require('../admin/utils/categoryValidation');



router.get('/add-category', (req, res) => {
    
    res.render('products/addcategory')
})


router.post('/add-category', categoryValidation)


module.exports = router