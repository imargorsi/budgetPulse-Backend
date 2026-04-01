const {models} = require("./index")

module.exports = {
    register: async (body) => {
        try {

            const newUser = await models.User.create({
                name: body.name,
                email: body.email,
                password: body.password
            })

            return {
                response: newUser,
            }

        } catch (error) {
            console.error("Error in user registration:", error);
        }
    }
}