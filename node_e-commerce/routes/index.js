var express = require('express');
var router = express.Router();

const productController = require('./admin/controller/productController')

const paginate = require('./products/utils/pagination')

/* GET home page. */
router.get('/', productController.getPageIfLoggedIn);

router.get('/products/:page', productController.getPageIfLoggedIn)

module.exports = router;

