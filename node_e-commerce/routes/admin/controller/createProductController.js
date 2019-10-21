const Product = require('../../products/models/Product')
const faker = require('faker')

module.exports = {
    createProductById: ((req, res) => {
        for (let i = 10; i > 0; i--) {
        let newProduct = new Product()

       newProduct.category = req.params.categoryID
       newProduct.name = faker.commerce.productName()
        newProduct.price = faker.commerce.price()
        newProduct.image = faker.image.image()

       newProduct.save()
        .catch(err => {
            throw err
        })
    }
    req.flash('success', `Fake products created`)

    res.redirect('/api/admin/get-all-categories')
    })
}
