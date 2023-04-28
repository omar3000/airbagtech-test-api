const express = require("express");
const chekAuth = require('../middleware/check-auth');

const { evalExpression } = require('../controllers/evalexpression.controller.js')
module.exports = Expression = express.Router()

Expression.post('/',chekAuth, evalExpression)

