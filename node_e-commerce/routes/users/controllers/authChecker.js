/// HOMEWORK: created authChecker to check form fields not to be empty/email/etc


const authChecker = (req, res, next) => {
    emailChecker(req)
    passwordChecker(req)

    next()
}

const emailChecker = (email) => { 
    
    email.check('email').isEmail().withMessage('Please enter valid email')
    
}


const passwordChecker = (password) => {
    password.check('password').notEmpty().withMessage('Password cannot be empty')

    password.check('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d`~!@#$%^&*()_+]{5,10}$/).withMessage('Password needs be 5-10 characters and include at least one uppercase, lowercase, number and special character')


}


module.exports = authChecker