var express =  require("express")
var router = express.Router();
 const currentValueService = require("../service/currentValueService");





// POST /api/current-value
router.post("/api/current-value", async function(req, res, next) {
    try {
        const body = req.body;
        const normalizedCurrentValue = Number(body && body.current_value);

        if (!body || body.current_value == null || !body.date || Number.isNaN(normalizedCurrentValue)) {
            return res.status(400).json({
                isSuccess: false,
                message: "All Fields are required"
            })  
        }

        const currentValue = await currentValueService.createCurrentValue({
            current_value: normalizedCurrentValue,
            date: body.date 
        });

        const summary = await currentValueService.getPortfolioSummary(normalizedCurrentValue);

        res.status(201).json({ isSuccess: true, currentValue, summary });

    } catch (error) {
        next(error);
    }
}
)



module.exports = router;