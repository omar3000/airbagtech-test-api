const { searchHistory, saveHistory } = require('../dbutils.js')
const { v4: uuidv4 } = require('uuid');
const { type } = require('../consts.js');


async function evalExpression(req, res) {

    try{

        resultHistory = await searchHistory(req.body.operation, type.EXPRESSION,null);
    
        if(resultHistory){
            res.status(200).json(resultHistory.output);
            return;
        }
        const result = calcularExpresion(req.body.operation);
        await saveHistory({id: uuidv4(), input: req.body.operation, output: result, userid: req.userData.userId, type: type.EXPRESSION})
          
        res.status(200).json(result.toString());
    }
    catch(error){
        console.log(error)
        res.status(500).send(error)
    }
}

function calcularExpresion(expresion) {
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
  
    let numeros = [];
    let operadores = [];
  
    // Separar la expresión en tokens
    let tokens = expresion.match(/\d+|\+|\-|\*|\/|\(|\)/g);
  
    // Aplicar el algoritmo Shunting-yard
    for (let i = 0; i < tokens.length; i++) {
      let token = tokens[i];
      if (!isNaN(token)) {
        // Si el token es un número, agregarlo a la lista de números
        numeros.push(parseFloat(token));
      } else if (token === '(') {
        // Si el token es un paréntesis abierto, agregarlo a la lista de operadores
        operadores.push(token);
      } else if (token === ')') {
        // Si el token es un paréntesis cerrado, desapilar los operadores hasta encontrar el paréntesis abierto correspondiente
        while (operadores[operadores.length - 1] !== '(') {
          let op = operadores.pop();
          let b = numeros.pop();
          let a = numeros.pop();
          switch (op) {
            case '+':
              numeros.push(a + b);
              break;
            case '-':
              numeros.push(a - b);
              break;
            case '*':
              numeros.push(a * b);
              break;
            case '/':
              numeros.push(a / b);
              break;
          }
        }
        // Desapilar el paréntesis abierto correspondiente
        operadores.pop();
      } else {
        // Si el token es un operador, desapilar los operadores de mayor o igual precedencia hasta encontrar uno de menor precedencia o un paréntesis abierto
        while (operadores.length > 0 && operadores[operadores.length - 1] !== '(' && precedencia(token) <= precedencia(operadores[operadores.length - 1])) {
          let op = operadores.pop();
          let b = numeros.pop();
          let a = numeros.pop();
          switch (op) {
            case '+':
              numeros.push(a + b);
              break;
            case '-':
              numeros.push(a - b);
              break;
            case '*':
              numeros.push(a * b);
              break;
            case '/':
              numeros.push(a / b);
              break;
          }
        }
        // Apilar el operador actual
        operadores.push(token);
      }
    }
  
    // Desapilar los operadores restantes
    while (operadores.length > 0) {
      let op = operadores.pop();
      let b = numeros.pop();
      let a = numeros.pop();
      switch (op) {
        case '+':
          numeros.push(a + b);
          break;
        case '-':
          numeros.push(a - b);
          break;
        case '*':
          numeros.push(a * b);
          break;
        case '/':
          numeros.push(a / b);
          break;
      }
    }
  
    // El resultado final se encuentra en la lista de números
    return numeros[0];
  }


module.exports = { evalExpression }