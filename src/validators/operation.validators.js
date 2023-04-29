const { body }  = require('express-validator');

function operationValidation() {
    return [ body('operation').isString().withMessage('La propiedad debe ser un string').custom((operation) => {
        const onlyNumbersAndOperators = /^[\d\s/*()+-]+$/;
        if (!onlyNumbersAndOperators.test(operation)) {
          throw new Error('El campo operation debe contener solo números y los siguientes caracteres: /, *, (, ), +, -');
        }
        return true;
      })
    ];
}

module.exports = { operationValidation };  