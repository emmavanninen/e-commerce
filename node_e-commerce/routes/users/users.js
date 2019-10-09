var express = require('express');
var router = express.Router();
const authChecker = require('./controllers/authChecker');

const userController = require('./controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', (req, res) => {
  res.render('auth/signup', { errors: [] });
});

router.post('/signup', authChecker, (req, res) => {
  let errors = req.validationErrors();
    if (errors) {
        res.render('auth/signup', { error_msg: true, errors: errors });
    }
  userController
    .signup(req.body)
    .then(user => {
      res.redirect('/');
    })
    .catch(error => {
      res.render('auth/signup', { errors: [error] });
    });
});

router.get('/signin', (req, res) => {
  res.render('auth/signin', { errors: [] });
});

router.post('/signin', (req, res) => {
  userController
    .singin(req.body)
    .then(user => {
      res.redirect('/');
    })
    .catch(error => {
      console.log(error);
      res.render('auth/signin', { errors: [error] });
    });
});

module.exports = router;
