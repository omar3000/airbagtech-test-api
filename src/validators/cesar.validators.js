const { body }  = require('express-validator');

function cesarValidation() {
  return [ 
    body('str').isString().withMessage('La propiedad debe ser un string').custom((str) => {
      const onlyLetters = /^[A-Za-z]+$/;
      if (!onlyLetters.test(str)) {
        throw new Error('El campo str debe contener solo letras');
      }
      return true;
    }),
    body('displacement').isNumeric().withMessage('La propiedad debe ser un numero'), 
  ];
}

module.exports = { cesarValidation };  