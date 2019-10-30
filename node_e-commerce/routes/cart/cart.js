const express = require('express')
const router = express.Router()
const Cart = require('../cart/models/Cart');
const cartController = require('./controllers/cartController')
require('dotenv').config()
const async = require('async')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)



router.post('/product', cartController.addProductToCart)

router.get('/', cartController.getCart)

router.delete('/remove', cartController.removeProduct)

router.post('/payment', (req, res, next) => {
    const stripeToken = req.body.stripeToken
    const currentCharges = req.body.stripeMoney * 100
    console.log(`!!!!!!!!!!!!!!!!!!!!!!`, stripeToken)
    console.log(`2!!!!!!!!!!!!!!!!!!!!!`, currentCharges)
    
    stripe.customers
    .create({
            source: stripeToken
        })
        .then(customer => {
            console.log(`3!!!!!!!!!!!!!!!!!!!!!`, customer);
            
            const result = stripe.charges.create({
                amount: currentCharges,
                currency: 'usd',
                customer: customer.id
            })

            return result
        })
        .then(result => {
            
            async.waterfall([
                (callback) => {
                    Cart.findOne({
                        user: req.user._id
                    }, (error, cart) => {
                        callback(error, cart)
                    })
                },
                (cart, callback) => {
                    let user = req.user

                    for (let order of cart.items) {
                        user.history.push({
                            item: order.item,
                            paid: order.price
                        })
                    }

                    user.save((error, user) => {
                        if (error) return next(error)

                        callback(null, cart)
                    })
                },
                (cart) => {
                    cart.update({
                        $set: {
                            items: [],
                            total: 0
                        }
                    }, (error, updated) => {
                        if (updated) res.render('thankyou')
                    })
                }
            ])
        })
        .catch(error => {
            let errors = {}
            errors.status = 500
            errors.message = error

            res.status(errors.status).json(errors)
        })
})


module.exports = router