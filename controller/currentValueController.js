const currentValueService = require("../service/currentValueService");


const joi = require("joi");


const schema = joi.object({
    current_value: joi.number().required(),
    date: joi.date().required(),
    fundId: joi.number().required()
})


module.exports = {
    postCurrentValue: async (req, res, next) => {
         try {
                const { current_value, fundId, date } = await schema.validateAsync(req.body);

                const currentValue = await currentValueService.createCurrentValue({
                    current_value,
                    date,
                    fundId
                }, req.user.id);
        
                const summary = await currentValueService.getPortfolioSummary(fundId, current_value, req.user.id);
        
                res.apiSuccess({ currentValue, summary }, 201);
        
            } catch (error) {
                next(error);
            }   
}
}