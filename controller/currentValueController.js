const currentValueService = require("../service/currentValueService");


module.exports = {
    postCurrentValue: async (req, res, next) => {
         try {
                const body = req.body;
                const current_value = Number(body && body.current_value);
                const fundId = Number(body && body.fundId);
        
                if (
                    !body ||
                    body.current_value == null ||
                    !body.date ||
                    body.fundId == null ||
                    Number.isNaN(current_value) ||
                    Number.isNaN(fundId)
                ) {
                    return res.status(400).json({
                        isSuccess: false,
                        message: "All Fields are required and current_value/fundId must be valid numbers"
                    })  
                }
        
                const currentValue = await currentValueService.createCurrentValue({
                    current_value,
                    date: body.date,
                    fundId
                });
        
                const summary = await currentValueService.getPortfolioSummary(fundId, current_value);
        
                res.status(201).json({ isSuccess: true, currentValue, summary });
        
            } catch (error) {
                next(error);
            }   
}
}