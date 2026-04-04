const { db } = require("../models");

const createCurrentValue = async (payload) => {
    const fund = await db.Funds.findByPk(payload.fundId);
    if (!fund) {
        throw new Error("Invalid fundId: Fund does not exist");
    }

    return db.CurrentValue.create(payload);
};

const getPortfolioSummary = async (fundId, current_value) => {
    if (fundId == null) {
        throw new Error("fundId is required to compute portfolio summary");
    }

    if (current_value == null) {
        throw new Error("current value is required to compute portfolio summary");
    }

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