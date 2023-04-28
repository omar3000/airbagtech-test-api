const express = require("express");
const chekAuth = require('../middleware/check-auth');

const { encryptionCesar } = require("../controllers/cesar.controller.js");
const Cesar = express.Router();

Cesar.post('/',chekAuth, encryptionCesar);

module.exports = Cesar;

