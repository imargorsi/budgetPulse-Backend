const {db} = require("../models");

const getAllFunds = async () => {
    return db.Funds.findAll({ order: [["id", "ASC"]] });
}


const createFund = async (payload) => {
    return db.Funds.create(payload);
}


module.exports = {
    getAllFunds,
    createFund
}
