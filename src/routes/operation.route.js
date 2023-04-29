const express = require('express');
const chekAuth = require('../middleware/check-auth');
const { operationValidation } = require('../validators/operation.validators.js');
const { evalExpression } = require('../controllers/evalexpression.controller.js');
const Expression = express.Router();
Expression.post('/',chekAuth,operationValidation(), evalExpression);

module.exports = Expression;

