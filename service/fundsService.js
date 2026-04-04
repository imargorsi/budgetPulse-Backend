const {db} = require("../models");
const AppError = require("../helper/AppError");

const getAllFunds = async (userId) => {
    return db.Funds.findAll({
        where: { userId },
        order: [["id", "ASC"]],
    });
}


const createFund = async (payload) => {
    return db.Funds.create(payload);
}

const deleteFund = async (fundId, userId) => {
    const fund = await db.Funds.findOne({ where: { id: fundId, userId } });

    if (!fund) {
        throw new AppError("Fund not found for this user", 403);
    }

    const linkedInvestmentsCount = await db.Investments.count({ where: { fundId } });

    if (linkedInvestmentsCount > 0) {
        throw new AppError(
            "Fund is connected to investments. Delete the linked investments first.",
            409
        );
    }

    await fund.destroy();

    return fund;
}


module.exports = {
    getAllFunds,
    createFund
    ,
    deleteFund,
}
