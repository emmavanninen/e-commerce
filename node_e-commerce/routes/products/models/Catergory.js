const mongoose = require('mongoose')


const CategorySchema = new mongoose.Schema({
    name: {type: String, unique: true, lowecase: true}
})

///'category' how to name it in database
module.exports = mongoose.model('category', CategorySchema)
