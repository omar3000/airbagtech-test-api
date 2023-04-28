const express = require("express");
const chekAuth = require('../middleware/check-auth');

const { printCombinations } = require('../controllers/combination.controller.js');
const Combination = express.Router();

Combination.get('/',chekAuth, printCombinations);

module.exports = Combination;