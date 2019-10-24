const Cart = require('../models/Cart');

module.exports = {
    createUserCart: (req, res) => {
        
        newCart = Cart()
        newCart.user = req.user.id

        //! Callback insted of a promise
        newCart.save((error) =>{
            if (error) {
                req.status(500).json({
                    confimartion: 'failure',
                    message: error
                })
            } else {     
                req.user.id;
                         
                res.redirect('/')
            }
        })      
    },
    addProductToCart: (req, res) => {   
        console.log(`AAAAAAAAAAAAAAAAAAAAmount`, req.body.quantity);
                
       Cart.findOne({user: req.user}, (err, cart) => {
            const totalPrice = parseFloat(req.body.quantity)
               cart.items.push({
                   item: req.body.productID,
                   price: parseFloat(req.body.priceValue),
                   quantity: parseInt(req.body.quantity),
                })

                cart.total = (cart.total + totalPrice).toFixed(2)
                cart.save(err => {
                   if(err) throw err
                //    console.log(`????????????`, cart)
                   res.redirect('/api/cart')
                })
            })
    }
}