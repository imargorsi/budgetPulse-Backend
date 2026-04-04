const {db} = require("../models");
const AppError = require("../helper/AppError");


const getAllInvestments = async (fundId) => {
    const fund = await db.Funds.findByPk(fundId);
    if (!fund) {
        throw new AppError("Invalid fundId: Fund does not exist", 400);
    }

    return db.Investments.findAll({
        where: { fundId },
        order: [["id", "ASC"]],
    });
}

const createInvestment = async (payload) => {
    const fund = await db.Funds.findByPk(payload.fundId);
    if (!fund) {
        throw new AppError("Invalid fundId: Fund does not exist", 400);
    }

    return db.Investments.create(payload);
}


module.exports = {
    getAllInvestments,
    createInvestment
}