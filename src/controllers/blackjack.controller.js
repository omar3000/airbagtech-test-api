const { searchHistory, saveHistory } = require('../dbutils.js')
const { v4: uuidv4 } = require('uuid');
const { type } = require('../consts.js');


async function valueHandBlackjack(req, res) {

    let cards = req.body.cards;
    console.log(cards)

    const resultHistory = await searchHistory(cards.join(','), type.BLACK_JACK,null);

    if(resultHistory){
      res.status(200).json(resultHistory.output);
      return;
    }

    // Inicializamos el valor de la mano a cero y contamos el número de Ases
    let valor = 0;
    let numAses = 0;
    
    // Recorremos las cartas y calculamos su valor
    for (let card of cards) {
      if (card === 'A') {
        numAses++;
        valor += 11;
      } else if (card === 'J' || card === 'Q' || card === 'K') {
        valor += 10;
      } else {
        valor += parseInt(card);
      }
    }
    
    // Si tenemos algún As y el valor de la mano supera 21, restamos 10 al valor de cada As
    while (numAses > 0 && valor > 21) {
      valor -= 10;
      numAses--;
    }

    await saveHistory({id: uuidv4(), input: cards.join(','),  output: valor.toString(), userid: req.userData.userId, type: type.BLACK_JACK})
      
    res.status(200).json(valor.toString());
  }


module.exports = { valueHandBlackjack }