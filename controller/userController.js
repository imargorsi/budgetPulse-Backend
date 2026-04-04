const userService = require("../service/userService");
const joi = require("joi");


const schema = joi.object({
    name: joi.string().required().min(3),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.string().valid(joi.ref("password")).required().messages({
        "any.only": "Confirm password must match password"
    })
})

module.exports = {
    createUser: async (req, res, next) => {

        try {

            const validator = await schema.validateAsync(req.body);

            const user = await userService.registerUser(validator);

            res.apiSuccess({ user }, 201);

        } catch (error) {
            next(error);
        }
    }
}