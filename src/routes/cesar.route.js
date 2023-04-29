const express = require("express");
const chekAuth = require('../middleware/check-auth');
const { cesarValidation } = require('../validators/cesar.validators.js')
const { encryptionCesar } = require("../controllers/cesar.controller.js");
const Cesar = express.Router();

Cesar.post('/',chekAuth, cesarValidation(), encryptionCesar);

module.exports = Cesar;

