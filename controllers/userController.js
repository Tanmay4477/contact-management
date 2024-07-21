const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const secret_key = "myLove";

const signup = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        email,
        password: hashedPassword
    });
    if(user) {
        res.status(200).json({id: user._id, email: user.email});
    } else {
        res.status(400);
        throw new Error("User data not valid");
    }
});

const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});


    if(!user || !(await bcrypt.compare(password, user.password))) {
        res.status(404);
        throw new Error("User or Password is incorrect");
    }

    const token = jwt.sign({
        email,
        id: user.id
    }, secret_key, {expiresIn: "1h"});
    return res.status(201).json({token});
});

const current = asyncHandler(async (req, res) => {
    return res.status(200).json(req.user);
});


module.exports = {
    signup, login, current
}