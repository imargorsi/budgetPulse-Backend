var express  = require("express");
var router = express.Router();
const fundsService = require("../service/fundsService");

    


/**
 * @swagger
 * /api/funds:
 *   get:
 *     summary: Get all funds
 *     tags: [Funds]
 *     responses:
 *       200:
 *         description: List of funds
 */

router.get("/api/funds", async function(req, res, next) {
    try {
        const funds = await fundsService.getAllFunds();
        res.json({ ok: true, funds });
    }catch (error) {
        next(error);
    }
})



/**
 * @swagger
 * /api/funds:
 *   post:
 *     summary: Create a new fund
 *     tags: [Funds]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Fund'
 *     responses:
 *       201:
 *         description: Fund created successfully
 */
router.post("/api/funds", async function(req, res, next) {
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
});


module.exports = router;