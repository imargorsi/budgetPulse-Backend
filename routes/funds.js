var exporess = require("express");
var router = exporess.Router();
const fundsService = require("../service/fundsService");


// Get /api/funds
router.get("/api/funds", async function(req, res, next) {
    try {
        const funds = await fundsService.getAllFunds();
        res.json({ ok: true, funds });
    }catch (error) {
        next(error);
    }
})


// POST /api/funds
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