var express = require('express');
var router = express.Router();
// HOMEWORK: importing authChecker
// const authChecker = require('./controllers/authChecker');
const userController = require('./controllers/userController');
const signupValidation = require('./utils/signupValidation')
const passport = require('passport')
const User = require('./models/User')


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
    if(!req.isAuthenticated()) res.redirect('/api/users/signin')
    res.render('account/profile')
})

router.put('/edit-profile', passport.authenticate('edit-password', {
    successRedirect: '/api/users/edit-profile',
    failureRedirect: '/api/users/edit-profile',
    failureFlash: true

}), (req, res) => {
    
   userController.editProfile(req.body, req.user._id)
    .then(user => {
        req.flash('success', 'Profile updated')
        res.redirect('/api/users/edit-profile')
    })
    .catch(err => {
        req.flash('errors', err)
        
        res.redirect('/api/users/edit-profile')
    })
})

// (req, res) => {



//     let body = {
//         profile: {name: req.body.name,
//         picture: "",
//     },
//         email: req.body.email,
//         address: req.body.address,
//         password: req.body.password
//     }

//     User.findByIdAndUpdate(req.params.id, body, {new: true}, (err, result) => {
//     if(err){
//         throw new Error(err)        
//     } else {
//         req.flash('success', 'User have been updated')
//         res.render('account/profile')
//     }
//    })
// })


module.exports = router;
