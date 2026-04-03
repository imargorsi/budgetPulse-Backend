const sequelize = require("../bin/dbConnection");

 const { DataTypes } = require("sequelize");

const defineInvestments = require("./definations/investments");

const defineCurrentValue = require("./definations/currentValue");

 const Investments = defineInvestments(sequelize, DataTypes);

const CurrentValue = defineCurrentValue(sequelize, DataTypes);

const db = { sequelize, Investments, CurrentValue };

module.exports = { db };
