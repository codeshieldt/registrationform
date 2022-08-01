const {User, validate} = require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    return res.redirect('index.html');
});

app.post('/signup', async (req, res) => {

    const { error } = validate(res.body);
    if (error) return res.status(400).redirect('error.html');

    let user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save();

    const token = user.generateAuthToken();
    res.header('token', token).redirect('success.html');

});

app.post('/login', async (req, res) => {
    const { error } = logvalidate(req.body);
    if(error) return res.status(400).redirect('error.html');

    let user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400);

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.redirect('error.html');

    res.redirect('loggedin.html')

});

function logvalidate(id)
{
    const schema = {
        email: Joi.string().email().required().min(5).max(255),
        password: Joi.string().min(3).max(255).required()
    }

    return Joi.validate(id, schema);
}

module.exports = app;