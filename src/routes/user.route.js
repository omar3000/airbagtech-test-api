const express = require("express");
const { crear, login } = require('../controllers/user.controller.js')

module.exports = Users = express.Router()

Users.post('/', crear);

Users.post('/logIn',login)

