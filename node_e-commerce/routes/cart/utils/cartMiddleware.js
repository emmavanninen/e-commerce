const Cart = require('../models/Cart');

module.exports = (req, res, next) => {
  if (req.user) {
    Cart.findOne({ user: req.user.id })
      .then(cart => {
          let totalItems = 0
          for (let item of cart.items) totalItems += item.quantity
          
        res.locals.cart = cart;
        res.locals.itemsInCart = totalItems
        
        next();
      })
      .catch(error => next(error));

  } else {
      res.locals.itemsInCart = 0
      next()
  }
};
