const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config()

const sequelize = new Sequelize("test", "postgres", "root", {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: 5432
});

module.exports = {sequelize};
