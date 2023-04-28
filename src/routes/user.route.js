const express = require("express");
const { crear, login } = require('../controllers/user.controller.js');

const Users = express.Router();

Users.post('/', crear);

Users.post('/logIn',login);

module.exports = Users;