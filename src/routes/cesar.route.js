const express = require("express");
const chekAuth = require('../middleware/check-auth');

const { encryptionCesar } = require("../controllers/cesar.controller.js")
module.exports = Cesar = express.Router()

Cesar.post('/',chekAuth, encryptionCesar)

