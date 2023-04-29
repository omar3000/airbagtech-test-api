const { check }  = require('express-validator');

function loginValidate() {
    return [
        check('email')
          .isEmail()
          .normalizeEmail(),
        check('password')
          .isLength({min: 5, max: 20})
          .withMessage('La propiedad debe ser mas grande'),
    ];
}

module.exports = { loginValidate };  