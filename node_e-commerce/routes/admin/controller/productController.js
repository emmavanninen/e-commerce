
const Product = require('../../products/models/Product')

module.exports = {
    getAllProducts: (req, res) => {
        Product.find()
        // populate + exec using with ObjectId to pull category object from categories to target product object (Product.js)
        .populate('category')
        .exec()
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

    getByCategory: (req, res) => {
        Product.find({category: req.params.id})
            .populate('category')
            .exec()
            .then(products => {
                res.render('products/products', { products: products })
            })
            .catch(err => {
                throw err
            })
    },
    deleteProduct: (req, res) => {
        Product.remove({ _id: req.params.id })
            .then(products => {
                res.render('products/products', { products: products })
            })
            .catch(err => {
                throw err
            })

    }
}