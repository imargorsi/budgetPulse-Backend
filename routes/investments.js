var express =  require("express")
var router = express.Router();
const investmentService = require("../service/investmentService");


// Get /api/investments
router.get("/api/investments", async function(req, res, next) {
    try {
        const investments = await investmentService.getAllInvestments();
        res.json({ ok: true, investments });
    }catch (error) {
        next(error);
    }
})


// POST /api/investments
router.post("/api/investments", async function(req, res, next) {
    try {
        const body = req.body;

        if (!body || !body.name || !body.amount || !body.date) {
            return res.status(400).json({
                isSuccess: false,
                message: "All Fields are required"
            })
        }

        const investment = await investmentService.createInvestment({
            name: body.name,
            amount: body.amount,
            date: body.date 
        });



        res.status(201).json({ isSuccess: true, investment });


    } catch (error) {
        next(error);
    }
}
)




module.exports = router;