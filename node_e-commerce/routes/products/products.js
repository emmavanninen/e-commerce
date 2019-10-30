const express = require('express')
const router = express.Router()
const productController = require('../admin/controller/productController')
const Product = require('./models/Product')

Product.createMapping((error, mapping) =>{
    if(error) console.error(`Error creating mapping `, error);
    else console.log(`Mapping created `, mapping);
    
})

let stream = Product.synchronize()
let count = 0

stream.on('data', ()=>{
    count++
})

stream.on('close', ()=>{
    console.log(`Indexed ${count} documents`);
})

stream.on('error', ()=>{
    console.log(`Error: ${error}`);
    
})


router.get('/', productController.getAllProducts)

router.get('/search', productController.searchProductByQuery)

router.get('/:id', productController.getOneProduct)

router.get('/getproductbycategory/:id', productController.getByCategory)

// router.post('/search', (req, res) => {
//    res.redirect('/api/products/search?q=' + req.body.q)
// })





module.exports = router