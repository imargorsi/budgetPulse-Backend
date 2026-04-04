const {db} = require("../models");


const getAllInvestments = async () => {
    return db.Investments.findAll({ order: [["id", "ASC"]] });
}

const createInvestment = async (payload) => {
    const fund = await db.Funds.findByPk(payload.fundId);
    if (!fund) {
        throw new Error("Invalid fundId: Fund does not exist");
    }

    return db.Investments.create(payload);
}


module.exports = {
    getAllInvestments,
    createInvestment
}