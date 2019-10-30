
const Product = require('../../products/models/Product')
const paginate = require('../../products/utils/pagination')


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
    // deleteProduct: (req, res) => {

    //     Product.remove({ _id: req.params.id })
    //         .then(products => {
    //             res.render('products/products', { products: products })
    //         })
    //         .catch(err => {
    //             throw err
    //         })

    // },
    
    getPageIfLoggedIn: (req, res, next) => {
        if(req.user){
         paginate(req, res, next)
       } else {
           res.render('index')
        }
    },

    searchProductByQuery: (req, res) => {
        if(req.query.q){
            Product.search({
                query_string: {
                    query: req.query.q
                }
            }, (error, result) =>{
                if(error) throw error
                else {
                    let data = result.hits.hits
                    res.render('search/search-results', { data: data })
                }
            })
        }
    },

    
}