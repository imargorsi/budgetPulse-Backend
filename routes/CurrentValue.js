var express =  require("express")
var router = express.Router();
 const currentValueService = require("../service/currentValueService");



// Get /api/current-value
router.get("/api/current-value", async function(req, res, next) {
    try {
        const currentValues = await currentValueService.getAllCurrentValues();
        res.json({ ok: true, currentValues });
    }catch (error) {
        next(error);
    }
});



// POST /api/current-value
router.post("/api/current-value", async function(req, res, next) {
    try {
        const body = req.body;

        if (!body || !body.current_value || !body.date) {
            return res.status(400).json({
                isSuccess: false,
                message: "All Fields are required"
            })  
        }

        const currentValue = await currentValueService.createCurrentValue({
            current_value: body.current_value,
            date: body.date 
        });

        res.status(201).json({ isSuccess: true, currentValue });

    } catch (error) {
        next(error);
    }
}
)



module.exports = router;