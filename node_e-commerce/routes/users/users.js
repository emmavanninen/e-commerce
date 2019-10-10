var express = require('express');
var router = express.Router();
// HOMEWORK: importing authChecker
const authChecker = require('./controllers/authChecker');
const userController = require('./controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', (req, res) => {
    if (req.isAuthenticated()) return res.redirect('/')
    
  res.render('auth/signup', { errors: req.flash('errors'), error_msg: null });
});


// HOMEWORK: authChecker as middleware
router.post('/signup', authChecker, (req, res) => {
    // HOMEWORK: checking the form field errors before database
  let errors = req.validationErrors();
    if (errors) {
        res.render('auth/signup', { errors: errors });
    }

  userController
    .signup(req.body)
    .then(() => {
      res.redirect('/');
    })
    .catch(error => {
      res.render('auth/signup', { errors: [error] });
    });
});

router.get('/signin', (req, res) => {
    req.flash('testerror', 'flashpoop')
  res.render('auth/signin', { errors: [] });
});

router.post('/signin', (req, res) => {

    console.log('data coming from flash: ', req.flash('testerror'));
    console.log('data coming from flash: ', req.flash('testerror'));
    

  userController
    .singin(req.body)
    .then(user => {
        console.log(user);
        
      res.redirect('/');
    })
    .catch(error => {
    //   console.log(error);
      res.render('auth/signin', { errors: [error] });
    });
});

module.exports = router;
