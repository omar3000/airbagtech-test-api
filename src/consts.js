const type = {
  COMBINATIONS: 1,
  BLACK_JACK: 2,
  CESAR: 3,
  REPEAT: 4,
  EXPRESSION: 5
};

const cardType = {
  JACK: 'J',
  QUEEN: 'Q',
  AS: 'A',
  KING: 'K',
};

const operatorType = {
  ADDITION: '+',
  SUBTRACTION: '-',
  MULTIPLICATION: '*',
  SPLIT: '/',
  OPENING_PARENTHESIS : '(',
  CLOSING_PARENTHESIS: ')'
};

module.exports = { type, cardType, operatorType };