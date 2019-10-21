
const Product = require('../../products/models/Product')

module.exports = {
    getAllProducts: (req, res) => {
        Product.find()
        .then(products => {
                res.render('products/products', { products: products })
            })
            .catch(err => {
                throw err
            })
    },
    
    getOneProduct: (req, res) => {
        
        Product.findById(req.params.id)
            .then(product => {
                res.render('products/product', { product: product })
            })
            .catch(err => {
                throw err
            })


    },

}