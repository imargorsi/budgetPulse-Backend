var express =  require("express")
var router = express.Router();
 const currentValueService = require("../service/currentValueService");





// POST /api/current-value
router.post("/api/current-value", async function(req, res, next) {
    try {
        const body = req.body;
        const current_value = Number(body && body.current_value);

        if (!body || body.current_value == null || !body.date || Number.isNaN(current_value)) {
            return res.status(400).json({
                isSuccess: false,
                message: "All Fields are required and current_value must be a valid number"
            })  
        }

        const currentValue = await currentValueService.createCurrentValue({
            current_value,
            date: body.date 
        });

        const summary = await currentValueService.getPortfolioSummary(current_value);

        res.status(201).json({ isSuccess: true, currentValue, summary });

    } catch (error) {
        next(error);
    }
}
)



module.exports = router;