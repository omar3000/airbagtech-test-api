const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize("test", process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: 5432
});

module.exports = {sequelize};
