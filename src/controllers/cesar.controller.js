const { searchHistory, saveHistory } = require('../dbutils.js')
const { v4: uuidv4 } = require('uuid');
const { type } = require('../consts.js');


async function encryptionCesar(req, res) {

    try{
        const letras = req.body.str.toLowerCase().split('');

        resultHistory = await searchHistory(letras, type.CESAR,req.body.displacement);
    
        if(resultHistory){
            res.status(200).json(resultHistory.output);
            return;
        }
    
        const alfabeto = 'abcdefghijklmnopqrstuvwxyz';
       
        const cifrado = letras.map(letra => {
          if (letra === ' ') {
            return ' ';
          }
          const indice = alfabeto.indexOf(letra);
          const indiceCifrado = (indice + req.body.displacement) % alfabeto.length;
          return alfabeto[indiceCifrado];
        });
    
        await saveHistory({id: uuidv4(), input: letras, inpurExtra: req.body.displacement, output: cifrado.join('').toUpperCase(), userid: req.userData.userId, type: type.CESAR})
          
        res.status(200).json(cifrado.join('').toUpperCase());
    }
    catch(error){
        console.log(error)
        res.status(500).send(error)
    }

}

module.exports = { encryptionCesar }