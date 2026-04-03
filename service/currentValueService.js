const { db } = require("../models");

const createCurrentValue = async (payload) => {
    return db.CurrentValue.create(payload);
};

const getPortfolioSummary = async (currentValueInput) => {
    if (currentValueInput == null) {
        throw new Error("current value is required to compute portfolio summary");
    }

    const totalInvestedRaw = await db.Investments.sum("amount");
    const currentValueRaw = currentValueInput;

    const totalInvested = Number(totalInvestedRaw || 0);
    const currentValue = Number(currentValueRaw || 0);
    const profit = currentValue - totalInvested;
    const returnPercentage = totalInvested === 0 ? 0 : (profit / totalInvested) * 100;

    return {
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