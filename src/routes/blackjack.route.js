const express = require("express");
const chekAuth = require('../middleware/check-auth');

const { valueHandBlackjack } = require("../controllers/blackjack.controller.js");
const Blackjack = express.Router();

Blackjack.post('/',chekAuth, valueHandBlackjack);

module.exports = Blackjack;

