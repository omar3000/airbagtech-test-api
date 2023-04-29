const History = require( './models/history.model');

async function searchHistory(input, type, inputExtra =  ''){
  try{
    const history = await History.findOne({
      where: { type, input, inputExtra }
    });
    return history;
  }
  catch(error){
    return null;
  }
}

async function saveHistory(data){
  try{
    console.log(data);
    const history = await History.create(data);
    return history;
  }
  catch(error){
    console.log(error);
    return null;
  }
} 

module.exports = {searchHistory, saveHistory};

