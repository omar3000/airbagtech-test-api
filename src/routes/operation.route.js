const express = require("express");
const chekAuth = require('../middleware/check-auth');

const { evalExpression } = require('../controllers/evalexpression.controller.js');
const Expression = express.Router();
Expression.post('/',chekAuth, evalExpression);

module.exports = Expression;

