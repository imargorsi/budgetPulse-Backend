const {db} = require("../models");

const bycrypt = require("bcrypt");
const AppError = require("../helper/AppError");

const jwt = require('jsonwebtoken');


const toSafeUser = (user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
});

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

        return toSafeUser(newUser);

    } catch (error) {
        console.error("Error in user registration:", error);
        throw error; 
    }
}


const loginUser = async (email, password) => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new AppError("JWT configuration is missing", 500);
        }

        const user = await db.User.findOne({ where: { email } });

        if (!user) {
            throw new AppError("Invalid email or password", 401);
        }

        const isMatch = await bycrypt.compare(password, user.password);

        if (!isMatch) {
            throw new AppError("Invalid email or password", 401);
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        return { user: toSafeUser(user), token };

    } catch (error) {
        console.error("Error in user login:", error);
        throw error; 
    }
}

module.exports = {
    registerUser,
    loginUser
}