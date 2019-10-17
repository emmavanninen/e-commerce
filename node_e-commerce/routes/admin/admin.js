const express = require('express')
const router = express.Router()
const Category = require('../products/models/Catergory');



router.get('/add-category', (req, res) => {
    
    res.render('products/addcategory')
})


router.post('/add-category',  (req, res) => {
    Category.findOne({ name: req.body.name })
        .then(category => {
            if (category){
                req.flash('errors', `Category '${category.name}' already exists`)
                console.log(res.locals);
                console.log(`hit`);

                res.redirect('/api/admin/add-category')
            } else{
                const newCategory = new Category
                newCategory.name = req.body.name
                console.log(`whatshappeningdude `, newCategory);

                newCategory
                    .save()
                    .then(category =>{
                        req.flash('success', `Category '${category.name}' been created!`)

                        res.redirect('/api/admin/add-category')
                    })
                    .catch(err => {
                        throw err
                    })
            }
            
        })
        .catch(err => {
            throw err
        })

    
})

module.exports = router