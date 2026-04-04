var express =  require("express")
var router = express.Router();
 const currentValueService = require("../service/currentValueService");





 /**
 * @swagger
 * /api/current-value:
 *   post:
 *     summary: Post Current Value to compute portfolio summary
 *     tags: [CurrentValues]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CurrentValue'
 *     responses:
 *       201:
 *         description: Current value Posted successfully and portfolio summary computed successfully
 */

router.post("/api/current-value", async function(req, res, next) {
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
)



module.exports = router;