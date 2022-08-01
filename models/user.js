const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 3,
        maxlength: 25,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    }
})

userSchema.methods.generateAuthToken = function()
{
    const token = jwt.sign({email: this.email}, process.env.jwtPrivateKey);
    return token;   
}

const User = mongoose.model('users', userSchema);

function userValidate(user)
{
    const schema = {
        username: Joi.string().min(3).max(25).required(),
        email:  Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(3).max(255).required()
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = userValidate;