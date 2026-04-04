const { db } = require("../models");
const AppError = require("../helper/AppError");

const findUserFund = async (fundId, userId) => {
    const fund = await db.Funds.findOne({ where: { id: fundId, userId } });
    if (!fund) {
        throw new AppError("Fund not found for this user", 403);
    }
    return fund;
};

const createCurrentValue = async (payload, userId) => {
    await findUserFund(payload.fundId, userId);

    return db.CurrentValue.create(payload);
};

const getPortfolioSummary = async (fundId, current_value, userId) => {
    if (fundId == null) {
        throw new AppError("fundId is required to compute portfolio summary", 400);
    }

    if (current_value == null) {
        throw new AppError("current value is required to compute portfolio summary", 400);
    }

    await findUserFund(fundId, userId);

    const totalInvestedRaw = await db.Investments.sum("amount", {
        where: { fundId },
    });
    const currentValueRaw = current_value;

    const totalInvested = Number(totalInvestedRaw || 0);
    const currentValue = Number(currentValueRaw || 0);
    const profit = currentValue - totalInvested;
    const returnPercentage = totalInvested === 0 ? 0 : (profit / totalInvested) * 100;

    return {
        fundId,
        totalInvested,
        currentValue,
        profit,
        returnPercentage,
    };
};



module.exports = {
    createCurrentValue,
    
    getPortfolioSummary,
};