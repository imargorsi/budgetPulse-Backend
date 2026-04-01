const sequelize = require("../bin/dbConnection");

 const { DataTypes } = require("sequelize");

const defineInvestments = require("./definations/investments");

const defineUser = require("./definations/user")

 const Investments = defineInvestments(sequelize, DataTypes);

 const User = defineUser(sequelize, DataTypes);

const db = { sequelize, Investments, User };

module.exports = { db };
