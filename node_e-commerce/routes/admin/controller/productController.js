
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
        
        Product.findById(id)
            .then(products => {
                res.render('products/product/:id', { products: products })
            })
            .catch(err => {
                throw err
            })


    },

}