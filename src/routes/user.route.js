const express = require('express');
const { crear, login } = require('../controllers/user.controller.js');
const { loginValidate }  = require('../validators/user.validators.js');

const Users = express.Router();

Users.post('/', loginValidate(), crear);

Users.post('/logIn', loginValidate(),login);

module.exports = Users;