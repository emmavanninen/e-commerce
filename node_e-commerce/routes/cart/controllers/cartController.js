const Cart = require('../models/Cart');

module.exports = {
  createUserCart: (req, res) => {
    newCart = Cart();
    newCart.user = req.user.id;

    //! Callback insted of a promise
    newCart.save(error => {
      if (error) {
        req.status(500).json({
          confimartion: 'failure',
          message: error
        });
      } else {
        req.user.id;

        res.redirect('/');
      }
    });
  },
  addProductToCart: (req, res) => {
    Cart.findOne({ user: req.user }, (err, cart) => {
        
      const totalPrice = parseFloat(req.body.quantity);
      cart.items.push({
        item: req.body.productID,
        price: parseFloat(req.body.priceValue),
        quantity: parseInt(req.body.quantity)
      });

      cart.total = (cart.total + totalPrice).toFixed(2);
      cart.save(err => {
        if (err) throw err;
        res.redirect('/api/cart');
      });
    });
  },
  getCart: (req, res) => {
      Cart.findOne({ user: req.user})
          .populate('items.item')
          .exec()
          .then(cart => {  
              //! { cart: cart } { name to call in ejs: parameter }
              res.render('cart/cart', { cart: cart })
          })
          .catch(err => {
              throw err
          })
  },
  removeProduct: (req, res) => {
      Cart.findOne({ user: req.user }, (err, cart) => {
            if (err) throw err

        //! Mongoose method pull object from array
            cart.items.pull(req.body.item)

            cart.save( () => {
                req.flash('success', 'Product deleted from the cart')
                res.redirect('/api/cart')
            })


        })
        
  }
};
