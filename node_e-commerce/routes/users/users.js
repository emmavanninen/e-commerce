var express = require('express');
var router = express.Router();
// HOMEWORK: importing authChecker
// const authChecker = require('./controllers/authChecker');
const userController = require('./controllers/userController');
const signupValidation = require('./utils/signupValidation')
const passport = require('passport')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', (req, res) => {
    if (req.isAuthenticated()) return res.redirect('/')
    
  res.render('auth/signup', { errors: req.flash('errors'), error_msg: null });
});

router.post('/signup', signupValidation, userController.signup)

router.get('/signin', (req, res) => {
    if(req.isAuthenticated()) return res.redirect('/')
    // req.flash('testerror', 'flashpoop')
  res.render('auth/signin');
});

router.post('/signin', passport.authenticate('local-login', {    
    successRedirect: '/',
    failureRedirect: '/api/users/signin',
    failureFlash: true

}))

router.get('/logout', (req, res) => {
   req.logOut()

   res.redirect('/')
})

router.get('/edit-profile', (req, res) => {
   res.render('account/profile')
})

router.get('/edit-profile', (req, res) => {
    res.render('account/edit-profile')
})

router.post('/edit-profile', (req, res) => {
    res.render('/account/edit-profile')
    console.log(user);
    
    // res.redirect('account/edit-profile')
})


module.exports = router;
