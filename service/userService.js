const {db} = require("../models");

const bycrypt = require("bcrypt");
const AppError = require("../helper/AppError");
const e = require("express");

const registerUser = async (body) => {
    try {

        const existingUser = await db.User.findOne({ where: { email: body.email } });

        if (existingUser) {
            throw new AppError("User with this email already exists", 400);
        }

        delete body.confirmPassword;
        const passwordHash = await bycrypt.hash(body.password, 10);

        const newUser = await db.User.create({
            name: body.name,
            email: body.email,
            password: passwordHash
        })

        return newUser;

    } catch (error) {
        console.error("Error in user registration:", error);
        throw error; 
    }
}

module.exports = {
    registerUser
}