var express =  require("express")
var router = express.Router();
const investmentService = require("../service/investmentService");


/**
 * @swagger
 * /api/investments:
 *   get:
 *     summary: Get all investments
 *     tags: [Investments]
 *     responses:
 *       200:
 *         description: List of investments
 */
router.get("/api/investments", async function(req, res, next) {
    try {
        const investments = await investmentService.getAllInvestments();
        res.json({ ok: true, investments });
    }catch (error) {
        next(error);
    }
})



/**
 * @swagger
 * /api/investments:
 *   post:
 *     summary: Post a new investment
 *     tags: [Investments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Investment'
 *     responses:
 *       201:
 *         description: Investment Posted successfully
 */
router.post("/api/investments", async function(req, res, next) {
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
)




module.exports = router;