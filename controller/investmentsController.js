const investmentService = require("../service/investmentService");


module.exports = {
    getAllInvestments: async (req, res, next) => {

          try {
                const investments = await investmentService.getAllInvestments();
                res.json({ ok: true, investments });
            } catch (error) {
                next(error);
            }

},


    createInvestment: async (req, res, next) => {

         try {
                const body = req.body;
                const normalizedAmount = Number(body && body.amount);
                const fundId = Number(body && body.fundId);
        
                if (
                    !body ||
                    body.amount == null ||
                    !body.date ||
                    body.fundId == null ||
                    Number.isNaN(normalizedAmount) ||
                    Number.isNaN(fundId)
                ) {
                    return res.status(400).json({
                        isSuccess: false,
                        message: "All Fields are required and fundId must be a valid number"
                    })
                }
        
                const investment = await investmentService.createInvestment({
                    amount: normalizedAmount,
                    date: body.date,
                    fundId
                });
        
        
        
                res.status(201).json({ isSuccess: true, investment });
        
        
            } catch (error) {
                next(error);
            }

}
}