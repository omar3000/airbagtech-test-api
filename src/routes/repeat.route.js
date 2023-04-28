const express = require("express");
const chekAuth = require('../middleware/check-auth');

const { removeRepeats } = require("../controllers/repeat.controller.js");
const Repeat = express.Router();

Repeat.post('/',chekAuth, removeRepeats);

module.exports = Repeat;

