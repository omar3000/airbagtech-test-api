const { searchHistory, saveHistory } = require('../dbutils.js')
const { v4: uuidv4 } = require('uuid');
const { type } = require('../consts.js');


async function removeRepeats(req, res) {

    try{
    
        const resultHistory = await searchHistory(req.body.array.join(','), type.REPEAT,null);
    
        if(resultHistory){
            res.status(200).json(resultHistory.output);
            return;
        }
        const arraySinRepetidos = [...new Set(req.body.array)]
    
        await saveHistory({id: uuidv4(), input: req.body.array.join(','), output: arraySinRepetidos.join(','), userid: req.userData.userId, type: type.REPEAT})
          
        res.status(200).json(arraySinRepetidos.join(','));
    }
    catch(error){
        console.log(error)
        res.status(500).send(error)
    }

}

module.exports = { removeRepeats }