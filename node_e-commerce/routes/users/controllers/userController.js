const User = require('../models/User');
const bcrypt = require('bcryptjs');


module.exports = {
  signup: (req, res, next) => {
    return new Promise((resolve, reject) => {
        let errorValidate = req.ValidationErrors()  

        if(errorValidate){
            res.render('auth/signup', {errors: errorValidate})

            return
        }
      User.findOne({ email: req.body.email })
        .then(user => {
          if (user) {
            let errors = {};
            errors.message = 'Email already exists';
            errors.status = 400;

            reject(errors);
          } else {
            const newUser = new User();
            newUser.password = req.body.password;
            newUser.email = req.body.email;
            newUser.profile.name = req.body.name;

            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {
                  reject(errors);
                } else {
                  newUser.password = hash;

                  newUser
                    .save()
                    .then(user => resolve(user))
                    .catch(err => reject(err));
                }
              });
            });
          }
        })
        .catch(err => reject(err));
    });
  },

  singin: params => {
    return new Promise((resolve, reject) => {
      User.findOne({ email: params.email })

        .then(user => {
        //   console.log(user);
          if (user === null) {
            let errors = {};
            errors.message = 'Wrong email';
            errors.status = 400;

            reject(errors);
          } else {

            bcrypt.compare(params.password, user.password, function(
              err,
              result
            ) {
              if (result) {
                console.log('YAY');
                resolve(user);
                reject(err);
              } else {
                console.log('NAY');
                let errors = {};
                errors.message = 'Wrong password';
                errors.status = 400;

                reject(errors);
              }
            });
          }
        })
        .catch(err => reject(err));
    });
  }
};
