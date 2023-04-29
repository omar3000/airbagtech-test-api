const { searchHistory, saveHistory } = require('../dbutils.js');
const { v4: uuidv4 } = require('uuid');
const { type } = require('../consts.js');

async function printCombinations(req, res)  {
  
  try{

    const resultHistory = await searchHistory(null, type.COMBINATIONS,null);

    if(resultHistory){
      res.status(200).json(resultHistory.output);
      return;
    }
  
    let combinations = [];

    combinations = await backtrack([], 0, combinations);
  
    await saveHistory({id: uuidv4(), output: combinations.join(','), userid: req.userData.userId, type: type.COMBINATIONS});
  
    res.status(200).json(combinations.join(','));

  }
  catch(error){
    console.log(error);
    res.status(500).send(error);
  }

}

async function backtrack(currCombination, currIndex, combinations) {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  if (currCombination.length === 3) {
    // Verificar que los dígitos no se repitan
    if (new Set(currCombination).size === 3) {
      // Verificar que la combinación no haya sido generada previamente
      const sortedCombination = [...currCombination].sort().join('');
      if (!combinations.includes(sortedCombination)) {
        combinations.push(sortedCombination);
      }
    }
    return combinations;
  }
  for (let i = currIndex; i < digits.length; i++) {
    combinations =await backtrack([...currCombination, digits[i]], i + 1, combinations);
  }
  return combinations;
}


module.exports = { printCombinations };