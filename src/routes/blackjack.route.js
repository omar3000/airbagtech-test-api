const express = require("express");
const chekAuth = require('../middleware/check-auth');

const { valueHandBlackjack } = require("../controllers/blackjack.controller.js")
module.exports = Blackjack = express.Router()

Blackjack.post('/',chekAuth, valueHandBlackjack)

