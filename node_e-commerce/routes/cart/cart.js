const express = require('express')
const router = express.Router()
const Cart = require('../cart/models/Cart');
const cartController = require('./controllers/cartController')


router.get('/', (req, res) => {
   res.send('poop')
})

router.post('/product', cartController.addProductToCart)


module.exports = router