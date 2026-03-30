const {db} = require("../models");


const getAllInvestments = async () => {
    return db.Investments.findAll({ order: [["id", "ASC"]] });
}

const createInvestment = async (payload) => {
    return db.Investments.create(payload);
}


module.exports = {
    getAllInvestments,
    createInvestment
}