const fundsService = require("../service/fundsService");

const joi = require("joi");

const schema = joi.object({
    name: joi.string().required(),
    description: joi.string().optional()
})

const deleteSchema = joi.object({
    fundId: joi.number().required(),
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
        },
    deleteFund: async (req, res, next) => {
        try {
            const { fundId } = await deleteSchema.validateAsync(req.params);
            const fund = await fundsService.deleteFund(fundId, req.user.id);

            res.apiSuccess({ fund });
        } catch (error) {
            next(error);
        }
        }
}