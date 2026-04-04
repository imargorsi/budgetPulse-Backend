const fundsService = require("../service/fundsService");

const joi = require("joi");

const schema = joi.object({
    name: joi.string().required(),
    description: joi.string().optional()
})



module.exports = {
    getAllFunds: async (req, res, next) => {
    try {
        const funds = await fundsService.getAllFunds(req.user.id);
        res.apiSuccess({ funds });
    }catch (error) {
        next(error);
    }
    },
    createFund: async (req, res, next) => {
        try {
            const validator = await schema.validateAsync(req.body);
              
                            const fund = await fundsService.createFund({
                                ...validator,
                                userId: req.user.id,
                            });
              res.apiSuccess({ fund }, 201);
          } catch (error) {
              next(error);
          }
        }
}