const express = require('express')
const router = express.Router()



router.get('/add-category', (req, res) => {
    res.render('products/addcategory')
})


module.exports = router