const {db} = require("../models");

const getAllFunds = async (userId) => {
    return db.Funds.findAll({
        where: { userId },
        order: [["id", "ASC"]],
    });
}


const createFund = async (payload) => {
    return db.Funds.create(payload);
}


module.exports = {
    getAllFunds,
    createFund
}
