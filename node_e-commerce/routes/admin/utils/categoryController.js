const Category = require('../../products/models/Catergory')


module.exports = {
    categoryValidation: (req, res, next) => {
       req.checkBody('name', 'Category cannot be empty').notEmpty()

   const errorValidate = req.validationErrors()

   if(errorValidate) {
       req.flash('errors', errorValidate[0].message)

       res.status(300).redirect('/api/admin/add-category')
   } else {
    Category.findOne({ name: req.body.name })
            .then(category => {

                if (category) {
                    req.flash('errors', `Category '${category.name}' already exists`)
                    console.log(res.locals);
                    console.log(`hit`);

                    res.redirect('/api/admin/add-category')
                } else {
                    const newCategory = new Category
                    newCategory.name = req.body.name
                    console.log(`whatshappeningdude `, newCategory);

                    newCategory
                        .save()
                        .then(category => {
                            req.flash('success', `Category '${category.name}' has been created!`)

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
        }
    },
    getAllCategories: (req, res) => {
        Category.find({})
            .then(categories =>{
                console.log(categories);
                
                res.render('categories/create-fake-product', {categories: categories})
            })
            .catch(error => {
                req.flash('errors', error)
            })


    }   
}