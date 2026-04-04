const sequelize = require("../bin/dbConnection");

 const { DataTypes } = require("sequelize");

const defineInvestments = require("./definations/investments");

const defineCurrentValue = require("./definations/currentValue");


const defineUser = require("./definations/user");


const defineFunds = require("./definations/funds");

 const Investments = defineInvestments(sequelize, DataTypes);

const CurrentValue = defineCurrentValue(sequelize, DataTypes);

const User = defineUser(sequelize, DataTypes);

const Funds = defineFunds(sequelize, DataTypes);

Funds.hasMany(Investments, {
	foreignKey: "fundId",
	as: "investments",
});

Investments.belongsTo(Funds, {
	foreignKey: "fundId",
	as: "fund",
});

Funds.hasMany(CurrentValue, {
    foreignKey: "fundId",
    as: "currentValues",
});

CurrentValue.belongsTo(Funds, {
    foreignKey: "fundId",
    as: "fund",
});

const db = { sequelize, Investments, CurrentValue, Funds, User };

module.exports = { db };
