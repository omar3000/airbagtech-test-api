const { searchHistory, saveHistory } = require('../dbutils.js');
const { v4: uuidv4 } = require('uuid');
const { type } = require('../consts.js');
const { validationResult } = require('express-validator');

async function evalExpression(req, res) {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).send({errors: errors.array()});
    return;
  }

  try{

    const resultHistory = await searchHistory(req.body.operation, type.EXPRESSION,null);
    
    if(resultHistory){
      res.status(200).json(resultHistory.output);
      return;
    }
    const result = calculateExpresion(req.body.operation);
    await saveHistory({id: uuidv4(), input: req.body.operation, output: result, userid: req.userData.userId, type: type.EXPRESSION});
          
    res.status(200).json(result.toString());
  }
  catch(error){
    console.log(error);
    res.status(500).send(error);
  }
}

function calculateExpresion(expresion) {
  // Función auxiliar para determinar la precedencia de los operadores
  function precedencia(op) {
    switch (op) {
    case '+':
    case '-':
      return 1;
    case '*':
    case '/':
      return 2;
    default:
      return 0;
    }
  }
  
  let numbers = [];
  let operations = [];
  
  // Separar la expresión en tokens
  let tokens = expresion.match(/\d+|\+|-|\*|\/|\(|\)/g);
  
  // Aplicar el algoritmo Shunting-yard
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    if (!isNaN(token)) {
      // Si el token es un número, agregarlo a la lista de números
      numbers.push(parseFloat(token));
    } else if (token === '(') {
      // Si el token es un paréntesis abierto, agregarlo a la lista de operadores
      operations.push(token);
    } else if (token === ')') {
      // Si el token es un paréntesis cerrado, desapilar los operadores hasta encontrar el paréntesis abierto correspondiente
      while (operations[operations.length - 1] !== '(') {
        let op = operations.pop();
        let b = numbers.pop();
        let a = numbers.pop();
        switch (op) {
        case '+':
          numbers.push(a + b);
          break;
        case '-':
          numbers.push(a - b);
          break;
        case '*':
          numbers.push(a * b);
          break;
        case '/':
          numbers.push(a / b);
          break;
        }
      }
      // Desapilar el paréntesis abierto correspondiente
      operations.pop();
    } else {
      // Si el token es un operador, desapilar los operadores de mayor o igual precedencia hasta encontrar uno de menor precedencia o un paréntesis abierto
      while (operations.length > 0 && operations[operations.length - 1] !== '(' && precedencia(token) <= precedencia(operations[operations.length - 1])) {
        let op = operations.pop();
        let b = numbers.pop();
        let a = numbers.pop();
        switch (op) {
        case '+':
          numbers.push(a + b);
          break;
        case '-':
          numbers.push(a - b);
          break;
        case '*':
          numbers.push(a * b);
          break;
        case '/':
          numbers.push(a / b);
          break;
        }
      }
      // Apilar el operador actual
      operations.push(token);
    }
  }
  
  // Desapilar los operadores restantes
  while (operations.length > 0) {
    let op = operations.pop();
    let b = numbers.pop();
    let a = numbers.pop();
    switch (op) {
    case '+':
      numbers.push(a + b);
      break;
    case '-':
      numbers.push(a - b);
      break;
    case '*':
      numbers.push(a * b);
      break;
    case '/':
      numbers.push(a / b);
      break;
    }
  }
  
  // El resultado final se encuentra en la lista de números
  return numbers[0];
}


module.exports = { evalExpression };