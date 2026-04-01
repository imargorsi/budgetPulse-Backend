var express =  require("express")
var router = express.Router();
const userService = require("../service/userService");


// POST /api/register
router.post("/api/register", async function(req, res, next) {

    try {

        const createdUser = await userService.register(req.body);

        if (createdUser.error) {
            return res.status(400).json({
                isSuccess: false,
                message: createdUser.error
            })

        }
        return res.status(201).json({
            isSuccess: true,
            user: createdUser.response
        })

    }catch (error) {
        next(error);
    }
   
})

module.exports = router;
