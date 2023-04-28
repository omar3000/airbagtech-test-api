const express = require('express');
const swaggerDocument = require('./src/swagger.json');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const  Users = require('./src/routes/user.route.js');
const Combinations = require("./src/routes/conbination.route.js");
const Blackjack = require('./src/routes/blackjack.route.js');
const Cesar = require('./src/routes/cesar.route.js');
const Repeat = require('./src/routes/repeat.route.js');
const Expression = require('./src/routes/operation.route.js');

dotenv.config();

const app = express()
const port = process.env.PORT || 3000;

// BODY PARSER
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// SWAGGER DOCS
app.use('/api-airbatech', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// ROUTES
app.use('/users', Users)
app.use('/combinations', Combinations)
app.use('/blackjack', Blackjack)
app.use('/cesar', Cesar)
app.use('/repeat', Repeat)
app.use('/expression', Expression)


// START SERVER
app.listen(port, () => console.log(`server is running on port ${port}`))

module.exports = app;