const sequelize = require("../bin/dbConnection");

 const { DataTypes } = require("sequelize");

const defineInvestments = require("./definations/investments");

 const Investments = defineInvestments(sequelize, DataTypes);

const db = { sequelize, Investments };

module.exports = { db };
