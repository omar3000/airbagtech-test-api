const express = require('express');
const chekAuth = require('../middleware/check-auth');
const { blackjackValidation } = require('../validators/blackjack.validators.js');
const { valueHandBlackjack } = require('../controllers/blackjack.controller.js');
const Blackjack = express.Router();

Blackjack.post('/',chekAuth, blackjackValidation(), valueHandBlackjack);

module.exports = Blackjack;

