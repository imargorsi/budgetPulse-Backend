const {db} = require("../models");

const createCurrentValue = async (payload) => {
    return db.CurrentValue.create(payload);
}


const getAllCurrentValues = async () => {
    return db.CurrentValue.findAll({ order: [["id", "ASC"]] });

    
}

module.exports = {
    createCurrentValue,
    getAllCurrentValues
}