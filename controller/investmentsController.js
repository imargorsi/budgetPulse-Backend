const investmentService = require("../service/investmentService");
const joi = require("joi");

const schema = joi.object({
    amount: joi.number().required(),
    date: joi.date().required(),
    fundId: joi.number().required(),
});

const getInvestmentsSchema = joi.object({
    fundId: joi.number().required(),
});

const deleteSchema = joi.object({
    investmentId: joi.number().required(),
});


module.exports = {
    getAllInvestments: async (req, res, next) => {
          try {
                const { fundId } = await getInvestmentsSchema.validateAsync(req.params);
                const investments = await investmentService.getAllInvestments(fundId, req.user.id);
                res.apiSuccess({ investments });
            } catch (error) {
                next(error);
            }
},


    createInvestment: async (req, res, next) => {

         try {
                const { amount, date, fundId } = await schema.validateAsync(req.body);
        
                const investment = await investmentService.createInvestment({
                    amount,
                    date,
                    fundId
                }, req.user.id);
        
        
        
                res.apiSuccess({ investment }, 201);
        
        
            } catch (error) {
                next(error);
            }

},

    deleteInvestment: async (req, res, next) => {
        try {
            const { investmentId } = await deleteSchema.validateAsync(req.params);
            const investment = await investmentService.deleteInvestment(investmentId, req.user.id);

            res.apiSuccess({ investment });
        } catch (error) {
            next(error);
        }

}
}