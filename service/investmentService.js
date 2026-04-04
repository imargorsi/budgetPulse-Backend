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

const deleteInvestment = async (investmentId, userId) => {
    const investment = await db.Investments.findOne({
        where: { id: investmentId },
        include: [
            {
                model: db.Funds,
                as: "fund",
                where: { userId },
            },
        ],
    });

    if (!investment) {
        throw new AppError("Investment not found for this user", 403);
    }

    await investment.destroy();

    return investment;
}


module.exports = {
    getAllInvestments,
    createInvestment,
    deleteInvestment,
}