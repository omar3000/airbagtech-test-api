const express = require("express");
const chekAuth = require('../middleware/check-auth');
const { repeatValidation } = require('../validators/repeat.validators.js')
const { removeRepeats } = require("../controllers/repeat.controller.js");
const Repeat = express.Router();

Repeat.post('/',chekAuth,repeatValidation(), removeRepeats);

module.exports = Repeat;

