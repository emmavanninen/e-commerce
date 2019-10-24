const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    total: { type: Number, default: 0 },
    items: [{
        item:    {type: mongoose.Schema.Types.ObjectId, ref: 'product'},
        price:    { type: Number, default: 1 },
        quantity: { type: Number, default: 0 },
    }],

})

module.exports = mongoose.model('cart', cartSchema)