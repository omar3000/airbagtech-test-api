const { body }  = require('express-validator');

function blackjackValidation() {
  
    return [ body('cards').isArray().withMessage('La propiedad debe ser un array').custom((cards) => {
        const inputs = ['2', '3', '4', '5', '6', '7', '8', '9', 'A', 'J', 'Q', 'K'];
        const isValid = cards.every((card) => {
          return typeof card === 'string' && inputs.includes(card);
        });
        if (!isValid) {
          throw new Error('El campo cards debe contener solo strings con valores válidos');
        }
        return true;
      }) ]
}

module.exports = { blackjackValidation };  