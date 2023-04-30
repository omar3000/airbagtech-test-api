const { searchHistory, saveHistory } = require('../dbutils.js');
const { v4: uuidv4 } = require('uuid');
const { type, cardType } = require('../consts.js');
const { validationResult } = require('express-validator');

async function valueHandBlackjack(req, res) {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).send({errors: errors.array()});
    return;
  }

  let cards = req.body.cards;
  console.log(cards);

  const resultHistory = await searchHistory(cards.join(','), type.BLACK_JACK,null);

  if(resultHistory){
    res.status(200).json(resultHistory.output);
    return;
  }

  // Inicializamos el valor de la mano a cero y contamos el número de Ases
  let value = 0;
  let numAses = 0;
    
  // Recorremos las cartas y calculamos su valor
  for (let card of cards) {
    if (card === cardType.AS) {
      numAses++;
      value += 11;
    } else if (card === cardType.JACK || card === cardType.QUEEN || card === cardType.KING) {
      value += 10;
    } else {
      value += parseInt(card);
    }
  }
    
  // Si tenemos algún As y el valor de la mano supera 21, restamos 10 al valor de cada As
  while (numAses > 0 && value > 21) {
    value -= 10;
    numAses--;
  }

  await saveHistory({id: uuidv4(), input: cards.join(','),  output: value.toString(), userid: req.userData.userId, type: type.BLACK_JACK});
      
  res.status(200).json(value.toString());
}


module.exports = { valueHandBlackjack };