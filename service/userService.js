const userModel = require("../models/userModel")


const bcrypt = require("bcrypt");



module.exports = {
    register: async (body) => {
        try {

            // const user =  await userModel.findOne({ where: { email: body.email } });

            // if (user) {
            //     return {
            //         error: "User with this email already exists"
            //     }
            // }

            delete body.confirmPassword;
            body.pasword =  await bcrypt.hash(body.password, 10);

            const createdUser = await userModel.register(body);

            return {
                response: createdUser
            }


        } catch (error) {
            return {
                error: error.message || "Error in user registration"
            }
    }
}
}