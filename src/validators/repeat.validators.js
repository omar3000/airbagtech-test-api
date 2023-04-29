const { body } = require('express-validator');

function repeatValidation() {
    return [ 
        body('array').isArray().withMessage('La propiedad debe ser un array'),
        body('array.*').isNumeric().withMessage('Cada elemento del array debe ser un numero'),
     ]
}

module.exports = { repeatValidation };  