const {db} = require("../models");
const AppError = require("../helper/AppError");

const findUserFund = async (fundId, userId) => {
    const fund = await db.Funds.findOne({ where: { id: fundId, userId } });
    if (!fund) {
        throw new AppError("Fund not found for this user", 403);
    }
    return fund;
};


const getAllInvestments = async (fundId, userId) => {
    await findUserFund(fundId, userId);

    return db.Investments.findAll({
        where: { fundId },
        order: [["id", "ASC"]],
    });
}

const createInvestment = async (payload, userId) => {
    await findUserFund(payload.fundId, userId);

    return db.Investments.create(payload);
}


module.exports = {
    getAllInvestments,
    createInvestment
}