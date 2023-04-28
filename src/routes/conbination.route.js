const express = require("express");
const chekAuth = require('../middleware/check-auth');

const { printCombinations } = require('../controllers/combination.controller.js');
const Users = express.Router();

Users.get('/',chekAuth, printCombinations);

