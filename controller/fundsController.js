const fundsService = require("../service/fundsService");


module.exports = {
    getAllFunds: async (req, res, next) => {
    try {
        const funds = await fundsService.getAllFunds();
        res.json({ ok: true, funds });
    }catch (error) {
        next(error);
    }
    },
    createFund: async (req, res, next) => {
        try {
              const body = req.body;
                  if (!body || !body.name) {  
                  return res.status(400).json({
                      isSuccess: false,
                      message: "Name field is required"
                  });
              }
      
              const fund = await fundsService.createFund(body);
              res.json({ ok: true, fund });
          } catch (error) {
              next(error);
          }
        }
}