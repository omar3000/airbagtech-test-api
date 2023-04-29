const { searchHistory, saveHistory } = require('../dbutils.js');
const { v4: uuidv4 } = require('uuid');
const { type } = require('../consts.js');
const { validationResult } = require('express-validator');

async function encryptionCesar(req, res) {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).send({errors: errors.array()});
    return;
  }

  try{
    const letters = req.body.str.toLowerCase().split('');

    const resultHistory = await searchHistory(letters, type.CESAR,req.body.displacement);
    
    if(resultHistory){
      res.status(200).json(resultHistory.output);
      return;
    }
    
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
       
    const encryption = letters.map(letra => {
      if (letra === ' ') {
        return ' ';
      }
      const index = alphabet.indexOf(letra);
      const indexEncryption = (index + req.body.displacement) % alphabet.length;
      return alphabet[indexEncryption];
    });
    
    await saveHistory({id: uuidv4(), input: letters, inputExtra: req.body.displacement, output: encryption.join('').toUpperCase(), userid: req.userData.userId, type: type.CESAR});
          
    res.status(200).json(encryption.join('').toUpperCase());
  }
  catch(error){
    console.log(error);
    res.status(500).send(error);
  }

}

module.exports = { encryptionCesar };