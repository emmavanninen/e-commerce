let mongoose = require('mongoose')
let moment = require('moment')

let UserSchema = new mongoose.Schema({
    //required: true -> will not create new user without required fields
    email: { type: String, required: true},
    password: { type: String, required: true},
    profile: {
        name: {type: String, default: ''},
        picture: {type: String, default: ''},
    },
    address: {type: String, default: ''},
    history: [
        {
            item: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
            paid: { type: Number, default: 0 }
        }
    ],
    timestamp: {type: String, default: () => moment().format('dddd, MMMM Do YYYY, h:mm:ss a')},

})

module.exports = mongoose.model('User', UserSchema)

